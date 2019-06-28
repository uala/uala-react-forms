import React from 'react';
import { connectFormElement } from '../../src';

const errorHelper = {
  color: 'red',
};

// eslint-disable-next-line react/prop-types
const TextInput = ({ name, errors, onChange, defaultValue }) => {
  return (
    <div className="TextInput">
      <input type="text" defaultValue={defaultValue} name={name} onChange={e => onChange(name, e.target.value)} />
      {errors && <div style={{ ...errorHelper }}>{errors}</div>}
    </div>
  );
};

export default connectFormElement(TextInput);
