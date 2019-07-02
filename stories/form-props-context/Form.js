import React from 'react';
import { connectForm } from '../../src';

import customer from '../schema/customer';

// eslint-disable-next-line react/prop-types
const Form = ({ children }) => {
  return <form className="Form">{children}</form>;
};

export default connectForm({ schema: customer, validationMode: 'onchange' })(Form);
