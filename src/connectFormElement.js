import React from 'react';
import { Consumer } from './context';

const connectFormElement = Target => {
  function FormElement(props) {
    return (
      <Consumer>
        {({ values, errors, onChange, emitEvent }) => {
          // eslint-disable-next-line react/prop-types
          const { name } = props;

          return (
            <Target
              values={values}
              defaultValue={(values && name && values[name]) || ''}
              errors={errors}
              onChange={onChange}
              emitEvent={emitEvent}
              {...props}
            />
          );
        }}
      </Consumer>
    );
  }

  FormElement.displayName = `connectFormElement(${Target.displayName || Target.name || 'Component'})`;

  return FormElement;
};

export default connectFormElement;
