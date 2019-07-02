import React from 'react';
import { connectForm, ON_DID_CHANGE } from '../../src';

import customer from '../schema/customer';

// eslint-disable-next-line react/prop-types
const Form = ({ children }) => {
  return <form className="Form">{children}</form>;
};

export default connectForm({ schema: customer, validationMode: ON_DID_CHANGE })(Form);
