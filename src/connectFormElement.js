import React from 'react';
import { Consumer } from './context';

const connectFormElement = Target => {
  function FormElement(props) {
    return (
      <Consumer>
        {({ values, errors, onChange, emitEvent }) => {
          return (
            <Target values={values} errors={errors || null} onChange={onChange} emitEvent={emitEvent} {...props} />
          );
        }}
      </Consumer>
    );
  }

  FormElement.displayName = `connectFormElement(${Target.displayName || Target.name || 'Component'})`;

  return FormElement;
};

export default connectFormElement;
