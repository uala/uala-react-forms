import React from 'react';
import { connectForm } from '../../src';

import schema from './schema';

// eslint-disable-next-line react/prop-types
const Form = ({ children, emitSubmit }) => {
  const submit = e => {
    e.preventDefault();
    e.stopPropagation();

    emitSubmit();
  };

  return (
    <form className="Form" onSubmit={submit}>
      {children}
    </form>
  );
};

export default connectForm({ schema })(Form);
