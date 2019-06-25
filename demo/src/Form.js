import React from 'react';
import { connectForm } from '../../src';

// eslint-disable-next-line react/prop-types
const Form = ({ children }) => <div className="Form">{children}</div>;

export default connectForm(Form);
