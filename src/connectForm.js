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

  function Form(props) {
    const [values, setValues] = useState(defaultValues);
    const [errors, setErrors] = useState(null);

    const shouldValidate = eventType => {
      const { validationMode } = optionsWithDefaults;

      return eventType === validationMode;
    };

    const runValidation = async (name, value) => {
      const testValues = { ...values, [name]: value };

      const validation = await schemaInterface.validate(testValues);

      if (JSON.stringify(errors) !== JSON.stringify(validation.errors)) {
        await setErrors(validation.errors);
      }
    };

    const emitEvent = async ({ type, name, value }) => {
      console.log(type);

      if (shouldValidate(type)) {
        console.log('here it goes...');

        await runValidation(name, value);
      }

      if (type === 'onchange') {
        await setValues({ ...values, [name]: value });
      }
    };

    const handleSubmit = async event => {
      event.stopPropagation();
      event.preventDefault();

      await emitEvent({ type: 'onsubmit' });
    };

    const onChange = (name, value) => emitEvent({ type: 'onchange', name, value });

    const ualaFormContext = {
      values,
      onChange,
      emitEvent,
      errors,
      handleSubmit,
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
