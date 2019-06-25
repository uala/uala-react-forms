import React, { useState } from 'react';
import { Provider } from './context';

const connectForm = (Target) => {
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
