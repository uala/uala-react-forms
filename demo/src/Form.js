import React from 'react';
import { connectForm } from '../../src';

import schema from './schema';

// eslint-disable-next-line react/prop-types
const Form = ({ children }) => <div className="Form">{children}</div>;

export default connectForm({ schema })(Form);
