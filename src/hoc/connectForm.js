import React, { useState, useEffect } from 'react';
import { mergeDefaultOptions } from '../utils';
import { Provider } from '../context';
import createSchema from '../schema';
import connectFormPropTypes from './connectForm.propTypes';
import * as Events from './connectForm.events';

/**
 * Connect the form properties, such schema, validation mode, etc. to the `Component`
 * designed as wrapper.
 *
 * @param {Object} [options] - the configuration options.
 * @param {Object|null} [options.schema] - the form schema.
 *  Schema is used to define defaults form values, the initial state and the validation rules.
 * @param {string} [options.schemaVendor='yup'] - the validation schema vendor,
 *  set to 'yup' by default.
 * @param {string} [options.validationMode='onsubmit'] - the validation mode used.
 *  Allowed values are: `onsubmit`, `onblur`, `onchange`
 * @param {boolean} [options.statePropagation=false] - whether the stage changes should be
 *  propagated or not. Default `false`.
 *
 * @return {function(*): function(*): *} -
 *  The `Form` component enhanced with listeners and properties.
 */
const connectForm = options => Target => {
  const schema = options && options.schema ? options.schema : null;
  const optionsWithDefaults = mergeDefaultOptions(options);

  const schemaInterface =
    schema && Object.keys(schema).length > 0 ? createSchema(schema, optionsWithDefaults.vendor) : null;

  function Form({ onSubmit, onChange, onDidChange, onEvent, ...props }) {
    const { context } = props || {};
    const defaultValues = (schemaInterface && schemaInterface.getDefaults(context)) || {};

    const [values, setValues] = useState(defaultValues);
    const [errors, setErrors] = useState(null);
    const [touched, setTouched] = useState(false);
    const [validationCount, setValidationCount] = useState(0);

    let newValues = values;
    let newErrors = errors;

    // Validation
    const shouldValidate = eventType => {
      const { validationMode } = optionsWithDefaults;

      if (!schemaInterface) {
        return false;
      }

      if (eventType === Events.ON_SUBMIT) {
        return true;
      }

      return eventType === validationMode;
    };

    const runValidation = async () => {
      const validation = await schemaInterface.validate(newValues, context);

      await setValidationCount(validationCount + 1);

      if (errors !== validation.errors) {
        newErrors = validation.errors;
        await setErrors(newErrors);
      }
    };

    const validateIfNeeded = async eventType => {
      if (shouldValidate(eventType)) {
        await runValidation();
      }
    };

    // Event handling
    const emitEvent = async ({ type, name, value }) => {
      switch (type) {
        case Events.ON_SUBMIT:
          await validateIfNeeded(type);

          if (onSubmit && !newErrors) {
            await setTouched(false);
            onSubmit({ values });
          }

          break;
        case Events.ON_CHANGE:
          newValues = { ...values, [name]: value };

          await setTouched(true);
          await setValues(newValues);
          await validateIfNeeded(type);

          if (onChange) {
            onChange(name, value);
          }

          break;
        case Events.ON_DID_CHANGE:
          await validateIfNeeded(type);

          if (onDidChange) {
            onDidChange(name, value);
          }

          break;
        default:
          await validateIfNeeded(type);

          if (onEvent) {
            onEvent(name, value);
          }
          break;
      }
    };

    useEffect(() => {
      const { validationMode } = optionsWithDefaults;

      if (touched && validationCount > 0 && validationMode !== Events.ON_SUBMIT) {
        runValidation();
      }

      return () => {};
    }, [context]);

    // Event emitters
    const emitSubmit = () => emitEvent({ type: Events.ON_SUBMIT });

    const emitChange = (name, value) => emitEvent({ type: Events.ON_CHANGE, name, value });

    const emitDidChange = (name, value) => emitEvent({ type: Events.ON_DID_CHANGE, name, value });

    // Context bag
    const formContext = {
      values,
      touched,
      emitChange,
      emitDidChange,
      emitEvent,
      errors,
      emitSubmit,
    };

    return (
      <Provider value={formContext}>
        <Target {...props} {...formContext} />
      </Provider>
    );
  }

  Form.displayName = `connectForm(${Target.displayName || Target.name || 'Component'})`;
  Form.propTypes = {
    ...connectFormPropTypes,
    ...Target.propTypes,
  };

  return Form;
};

export default connectForm;
