import React, { useEffect, useState } from 'react';
import { storiesOf } from '@storybook/react';

import Form from './Form';
import Input from './Input';

const LazyValidation = () => {
  const [formContext, setFormContext] = useState({ min_username_length: 0 });

  useEffect(() => {
    const timeout = setTimeout(() => setFormContext({ min_username_length: 3 }), 4000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Form context={formContext}>
      <Input name="first_name" label="First name" />
      <Input name="last_name" label="Last name" />
      <Input name="username" label={`Username (min length: ${formContext.min_username_length})`} />
      <p>Form re-validate automatically after 4 seconds</p>
    </Form>
  );
};

storiesOf('Form Props | context', module).add('lazy validation', () => <LazyValidation />);
