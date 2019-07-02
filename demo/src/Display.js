import React from 'react';
import { connectFormElement } from '../../src';
import TextInput from './TextInput';

const style = {
  position: 'fixed',
  right: 0,
  top: 0,
  width: 200,
  background: '#ddd',
};

/* eslint-disable react/prop-types, camelcase */
const Display = ({ values: { first_name, last_name, image, privacy } }) => (
  <div className="Display" style={style}>
    <h3>{first_name}</h3>
    <h3>{last_name}</h3>
    <div>{`Image: ${image || 'no image selected'}`}</div>
    {!!privacy && (
      <div>
        <TextInput name="notification_type" />
      </div>
    )}
  </div>
);
/* eslint-enable react/prop-types, camelcase */

export default connectFormElement(Display);
