import React, { useState } from 'react';
import { Provider } from './context';
import createSchema from './schema';
import mergeDefaultOptions from './mergeDefaultOptions';

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

  const defaultValues = (schemaInterface && schemaInterface.getDefaults()) || {};

  function Form({ onFormSubmit, onFormChange, ...props }) {
    const [values, setValues] = useState(defaultValues);
    const [errors, setErrors] = useState(null);

    let newValues = values;
    let newErrors = errors;

    const shouldValidate = eventType => {
      const { validationMode } = optionsWithDefaults;

      return eventType === validationMode;
    };

    const runValidation = async () => {
      const validation = await schemaInterface.validate(newValues);

      if (errors !== validation.errors) {
        newErrors = validation.errors;
        await setErrors(newErrors);
      }
    };

    const emitEvent = async ({ type, name, value }) => {
      if (type === 'onchange') {
        const newValues = { ...values, [name]: value };

        await setValues(newValues);

        if (shouldValidate(type)) {
          await runValidation();
        }

        if (onFormChange) {
          onFormChange(name, value);
        }
      }

      if (type === 'ondidchange') {
        if (shouldValidate(type)) {
          await runValidation();
        }
      }

      if (type === 'onsubmit') {
        if (shouldValidate(type)) {
          await runValidation();
        }

        if (onFormSubmit && !newErrors) {
          onFormSubmit({ values });
        }
      }
    };

    const emitSubmit = () => emitEvent({ type: 'onsubmit' });

    const emitChange = (name, value) => emitEvent({ type: 'onchange', name, value });

    const ualaFormContext = {
      values,
      emitChange,
      emitEvent,
      errors,
      emitSubmit,
    };

    return (
      <Provider value={{ ...ualaFormContext }}>
        <Target {...props} {...ualaFormContext} />
      </Provider>
    );
  }

  Form.displayName = `connectForm(${Target.displayName || Target.name || 'Component'})`;

  return Form;
};

export default connectForm;
