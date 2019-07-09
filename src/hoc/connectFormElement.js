import React, { useCallback } from 'react';
import { Consumer, createHandler } from '../utils';
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
    const handleEvent = useCallback(emitEvent => createHandler(emitEvent, onEvent), [onEvent]);

    const handleChange = useCallback(emitChange => createHandler(emitChange, onChange), [onChange]);

    const handleSubmit = useCallback(emitSubmit => createHandler(emitSubmit, onSubmit), [onSubmit]);

    const handleDidChange = useCallback(emitDidChange => createHandler(emitDidChange, onDidChange), [onDidChange]);

    return (
      <Consumer>
        {({ values, errors, emitDidChange, emitChange, emitEvent, emitSubmit }) => (
          <Target
            values={values}
            errors={errors || null}
            emitChange={handleChange(emitChange)}
            emitEvent={handleEvent(emitEvent)}
            emitDidChange={handleDidChange(emitDidChange)}
            emitSubmit={handleSubmit(emitSubmit)}
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
