import React from 'react';
import { connectFormElement } from '../../src';

const style = {
  Input: {
    padding: 10,
  },
  Label: {
    display: 'block',
    fontSize: 16,
  },
};

// eslint-disable-next-line react/prop-types
const TextInput = ({ name, label, emitChange, emitDidChange, values, errors }) => {
  // eslint-disable-next-line react/prop-types
  const inputErrors = errors ? errors.filter(err => err.name === name) : false;
  return (
    <div className="TextInput" style={style.Input}>
      <input
        type="text"
        value={values[name]}
        name={name}
        onChange={e => emitChange(name, e.target.value)}
        onBlur={emitDidChange}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */}
      {label && <label style={style.Label}>{label}</label>}
      {inputErrors && <div color="red">{inputErrors.map(err => err.message.join(', '))}</div>}
    </div>
  );
};

export default connectFormElement(TextInput);
