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

const TextInput = ({ name, label, emitChange, values, errors }) => {
  const inputErrors = errors ? errors.filter(err => err.name === name) : false;
  return (
    <div className="TextInput" style={style.Input}>
      {label && <label style={style.Label}>{label}</label>}
      <input type="text" value={values[name]} name={name} onChange={e => emitChange(name, e.target.value)} />
      {inputErrors && <div color="red">{inputErrors.map(err => err.message.join(', '))}</div>}
    </div>
  );
};

export default connectFormElement(TextInput);
