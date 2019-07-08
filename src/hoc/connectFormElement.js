import React from 'react';
import { Consumer } from '../context';
import connectFormElementPropTypes from './connectFormElement.propTypes';

/**
 * Connect the target `Component` to the form context. The context empowers the passed component,
 * attaching `values`, `errors`, `onChange` and `emitEvent`.
 *
 * @param Target
 * @returns {function(*): *}
 */
const connectFormElement = Target => {
  function FormElement({ onChange, onDidChange, onSubmit, onEvent, ...props }) {
    return (
      <Consumer>
        {({ values, errors, emitChange, emitEvent, emitDidChange, emitSubmit }) => {
          const handleEvent = onEvent
            ? (...args) => {
                emitEvent(...args);
                onEvent(...args);
              }
            : emitEvent;

          const handleChange = (...args) => {
            emitChange(...args);

            if (onChange) {
              onChange(...args);
            }
          };

          const handleSubmit = (...args) => {
            emitSubmit(...args);

            if (onSubmit) {
              onSubmit(...args);
            }
          };

          const handleDidChange = (...args) => {
            emitDidChange(...args);

            if (onDidChange) {
              onDidChange(...args);
            }
          };

          return (
            <Target
              values={values}
              errors={errors || null}
              emitChange={handleChange}
              emitEvent={handleEvent}
              emitDidChange={handleDidChange}
              emitSubmit={handleSubmit}
              {...props}
            />
          );
        }}
      </Consumer>
    );
  }

  FormElement.displayName = `connectFormElement(${Target.displayName || Target.name || 'Component'})`;
  FormElement.propTypes = {
    ...connectFormElementPropTypes,
    ...Target.propTypes,
  };

  return FormElement;
};

export default connectFormElement;
