import React from 'react';

import Form from './Form';
import TextInput from './TextInput';
import Checkbox from './Checkbox';
import Display from './Display';
import Privacy from './Privacy';
import ImageSelection from './ImageSelection';

const Demo = () => (
  <div>
    <Form>
      <TextInput name="first_name" />
      <TextInput name="last_name" />
      <Checkbox name="privacy" />
      <div>
        <ImageSelection name="image" />
      </div>
      <Privacy />
      <Display />
    </Form>
  </div>
);

export default Demo;
