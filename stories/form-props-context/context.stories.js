import React, { useEffect, useState } from 'react';
import { storiesOf } from '@storybook/react';

import Form from './Form';
import Input from './Input';

const TIMEOUT_S = 3;

const LazyValidation = () => {
  const [formContext, setFormContext] = useState({ min_username_length: 0 });

  useEffect(() => {
    const timeout = setTimeout(() => setFormContext({ min_username_length: 3 }), TIMEOUT_S * 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Form context={formContext}>
      <Input name="first_name" label="First name" />
      <Input name="last_name" label="Last name" />
      <Input name="username" label={`Username (min length: ${formContext.min_username_length})`} />
      <p>Form re-validate automatically after{TIMEOUT_S} seconds</p>
    </Form>
  );
};

storiesOf('Form Props | context', module).add('lazy validation', () => <LazyValidation />);
