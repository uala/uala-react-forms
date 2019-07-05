import React from 'react';
import { object, string } from 'yup';
import { storiesOf } from '@storybook/react';

import { Form, FormElement } from '../../src';

const schema = object({
  firstName: string().default(''),
});

const MyElement = () => (
  <FormElement>
    {({ values: { firstName }, emitChange }) => (
      <input
        type="text"
        name="firstName"
        defaultValue={firstName}
        onChange={({ target: { name, value } }) => emitChange(name, value)}
      />
    )}
  </FormElement>
);

const MyForm = () => {
  const handleSubmit = (event, values) => {
    event.stopPropagation();
    event.preventDefault();

    // Here your call to store values, remote validation, etc...
    console.log('values', values);
  };

  return (
    <Form schema={schema}>
      {({ values }) => (
        <form onSubmit={e => handleSubmit(e, values)}>
          <MyElement />
          <input type="submit" value="Submit" />
        </form>
      )}
    </Form>
  );
};

storiesOf('Components | Form', module).add('basic usage', () => <MyForm />);
