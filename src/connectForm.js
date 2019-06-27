import React, { useState } from 'react';
import { Provider } from './context';
import createSchema from './schema';

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
  const schema = options && options.schema ? options.schema : {};
  const schemaInterface = schema ? createSchema(schema, 'yup') : null;
  const defaultValues = (schemaInterface && schemaInterface.getDefaults()) || {};

  function Form(props) {
    const [values, setValues] = useState(defaultValues);

    const emitEvent = ({ type, name, value }) => {
      switch (type) {
        case 'onchange':
          setValues({ ...values, [name]: value });
          break;
        default:
          break;
      }
    };

    const onChange = (name, value) => emitEvent({ type: 'onchange', name, value });

    return (
      <Provider value={{ values, onChange, emitEvent }}>
        <Target {...props} />
      </Provider>
    );
  }

  Form.displayName = `connectForm(${Target.displayName || Target.name || 'Component'})`;

  return Form;
};

export default connectForm;
