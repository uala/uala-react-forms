import React, { useState } from 'react';
import { Provider } from './context';

/**
 * Connect the form properties, such schema, validation mode, etc. to the `Component`
 * designed as wrapper.
 *
 * @param {Object} [options] - the configuration options.
 * @param {Object} [options.schema] - the form schema.
 *  Schema is used to define defaults form values, the initial state and the validation rules.
 * @param {string} [options.schemaVendor='yup'] - the validation schema vendor.
 * @param {string} [options.validationMode='onsubmit'] - the validation mode used.
 *  Allowed values are: `onsubmit`, `onblur`, `onchange`
 * @param {boolean} [options.statePropagation=false] - whether the stage changes should be
 *  propagated or not.
 *
 * @return {function(*): function(*): *} -
 *  The `Form` component enhanced with listeners and properties.
 */
const connectForm = ({
  schema,
  schemaVendor = 'yup',
  validationMode = 'onsubmit',
  statePropagation = false,
} = null) => (Target) => {
  function Form(props) {
    const [values, setValues] = useState({});

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
