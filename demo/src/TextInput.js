import React from 'react';
import { connectFormElement, getErrorByName } from '../../src';

const errorHelper = {
  color: 'red',
};

// eslint-disable-next-line react/prop-types
const TextInput = ({ name, errors, onChange, values }) => {
  return (
    <div className="TextInput">
      <input type="text" defaultValue={values[name]} name={name} onChange={e => onChange(name, e.target.value)} />
      {errors && <div style={{ ...errorHelper }}>{getErrorByName(errors, name)}</div>}
    </div>
  );
};

export default connectFormElement(TextInput);
