import React from 'react';
import { Consumer } from './context';

/**
 * Connect the target `Component` to the form context. The context empowers the passed component,
 * attaching `values`, `errors`, `onChange` and `emitEvent`.
 *
 * @param Target
 * @returns {function(*): *}
 */
const connectFormElement = Target => {
  function FormElement({ onChange, ...props }) {
    return (
      <Consumer>
        {({ values, errors, emitChange, emitEvent }) => {
          const emitChangeHandler = (...args) => {
            emitChange(...args);

            if (onChange) {
              onChange(...args);
            }
          };

          return (
            <Target
              values={values}
              errors={errors || null}
              emitChange={emitChangeHandler}
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
