import React, { useEffect, useReducer } from 'react';
import { mergeDefaultOptions } from '../utils';
import { Provider } from '../context';
import createSchema from '../schema';
import connectFormPropTypes from './connectForm.propTypes';
import * as Events from './connectForm.events';
import * as Actions from './connectForm.actions';
import urfReducer from './connectForm.reducer';

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

  function Form({
    context = null,
    initialValues = {},
    resetOnInitialValuesChange = false,
    onSubmit,
    onChange,
    onDidChange,
    onEvent,
    ...props
  }) {
    const defaultValues = (schemaInterface && schemaInterface.getDefaults()) || {};

    const [state, dispatch] = useReducer(urfReducer, {
      values: { ...defaultValues, ...initialValues },
      errors: null,
      touched: false,
      validationCount: 0,
    });

    let newValues = state.values;
    let newErrors = state.errors;

    const reset = () => {
      dispatch({
        type: Actions.UPDATE_FORM,
        payload: { errors: null, values: initialValues, touched: false },
      });
    };

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

      await dispatch({ type: Actions.UPDATE_FORM, payload: { validationCount: state.validationCount + 1 } });

      if (state.errors !== validation.errors) {
        newErrors = validation.errors;
        await dispatch({ type: Actions.UPDATE_FORM, payload: { errors: newErrors } });
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
            await dispatch({ type: Actions.UPDATE_FORM, payload: { touched: false } });
            onSubmit({ values: state.values });
          }

          break;
        case Events.ON_CHANGE:
          newValues = { ...state.values, [name]: value };

          await dispatch({ type: Actions.UPDATE_FORM, payload: { touched: true, values: newValues } });
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
      if (!resetOnInitialValuesChange) {
        return;
      }

      reset();
    }, [initialValues]);

    // Run validation on context change
    useEffect(() => {
      const { validationMode } = optionsWithDefaults;

      if (state.touched && state.validationCount > 0 && validationMode !== Events.ON_SUBMIT) {
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
      values: state.values,
      touched: state.touched,
      emitChange,
      emitDidChange,
      emitEvent,
      errors: state.errors,
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
