import React from 'react';
import { connectFormElement } from '../../src';

// eslint-disable-next-line react/prop-types
const TextInput = ({ name, onChange }) => (
  <div className="TextInput">
    <input
      type="text"
      name={name}
      onChange={e => onChange(name, e.target.value)}
    />
  </div>
);

export default connectFormElement(TextInput);