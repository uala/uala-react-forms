import React from 'react';
import { connectFormElement } from '../../src';

// eslint-disable-next-line react/prop-types
const Checkbox = ({ name, onChange }) => (
  <div className="Checkbox">
    <label htmlFor={name}>
      Checkbox
      <input
        id={name}
        name={name}
        type="checkbox"
        onChange={e => onChange(name, !!e.target.checked)}
      />
    </label>
  </div>
);

export default connectFormElement(Checkbox);
