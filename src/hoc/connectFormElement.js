import React, { useCallback } from 'react';
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
    const handleEmitter = useCallback((emitter, listener, ...args) => {
      emitter(...args);

      if (listener) {
        listener(...args);
      }
    }, []);

    return (
      <Consumer>
        {({ values, errors, emitDidChange, emitChange, emitEvent, emitSubmit }) => (
          <Target
            values={values}
            errors={errors || null}
            emitChange={(...eventValues) => handleEmitter(emitChange, onChange, ...eventValues)}
            emitEvent={(...eventValues) => handleEmitter(emitEvent, onEvent, ...eventValues)}
            emitDidChange={(...eventValues) => handleEmitter(emitDidChange, onDidChange, ...eventValues)}
            emitSubmit={(...eventValues) => handleEmitter(emitSubmit, onSubmit, ...eventValues)}
            {...props}
          />
        )}
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
