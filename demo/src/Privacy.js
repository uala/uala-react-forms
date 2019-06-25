import React from 'react';
import { connectFormElement } from '../../src';

// eslint-disable-next-line react/prop-types, camelcase
const Privacy = ({ values: notification_type }) => <div className="Privacy">{notification_type}</div>;

export default connectFormElement(Privacy);
