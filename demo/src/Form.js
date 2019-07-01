import React from 'react';
import { connectForm } from '../../src';

import schema from './schema';

// eslint-disable-next-line react/prop-types
const Form = ({ children, handleSubmit }) => (
  <form className="Form" onSubmit={handleSubmit}>
    {children}
  </form>
);

export default connectForm({ schema })(Form);
