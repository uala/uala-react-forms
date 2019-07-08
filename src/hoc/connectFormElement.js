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
    const handleEvent = useCallback(
      emitEvent =>
        onEvent
          ? (...args) => {
              emitEvent(...args);
              onEvent(...args);
            }
          : emitEvent,
      [onEvent]
    );

    const handleChange = useCallback(
      emitChange =>
        onChange
          ? (...args) => {
              emitChange(...args);
              onChange(...args);
            }
          : emitChange,
      [onChange]
    );

    const handleSubmit = useCallback(
      emitSubmit =>
        onSubmit
          ? (...args) => {
              emitSubmit(...args);
              onSubmit(...args);
            }
          : emitSubmit,
      [onSubmit]
    );

    const handleDidChange = useCallback(
      emitDidChange =>
        onDidChange
          ? (...args) => {
              emitDidChange(...args);
              onDidChange(...args);
            }
          : emitDidChange,
      [onDidChange]
    );

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
