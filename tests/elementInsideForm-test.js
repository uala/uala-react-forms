import expect from 'expect';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import { object, string } from 'yup';

import { Form, FormElement, getErrorByName } from '../src';

const schema = object({
  first_name: string()
    .required('This field is required')
    .default('Mark'),
  last_name: string()
    .required('last name is required')
    .default(''),
});

// eslint-disable-next-line react/prop-types
const TextInput = ({ name, emitDidChange }) => (
  <FormElement>
    {({ emitChange }) => (
      <input
        name={name}
        onChange={e => {
          emitChange(name, e.target.value);
        }}
        onBlur={emitDidChange}
      />
    )}
  </FormElement>
);

const DisplayFirstName = () => (
  <FormElement>{({ values }) => <div>{values.first_name}</div>}</FormElement>
);

// eslint-disable-next-line react/prop-types
const Errors = ({ name }) => <FormElement>{({ errors }) => <div>{getErrorByName(errors, name)}</div>}</FormElement>;

const TestNode = () => (
  <Form schema={schema} onSubmit={() => {}} onDidChange={() => {}}>
    {({ emitSubmit, emitDidChange, emitChange }) => (
      <div>
        <TextInput name="first_name" />
        <TextInput name="last_name" />
        <DisplayFirstName />
        <Errors name="last_name" />
        <input type="button" onClick={emitSubmit} value="Submit Emitter" />
        <input type="button" onClick={emitDidChange} value="DidChange Emitter" />
        <input type="button" onClick={emitChange} value="Change Emitter" />
      </div>
    )}
  </Form>
);

let node;

beforeEach(() => {
  node = document.createElement('div');
});

afterEach(() => {
  unmountComponentAtNode(node);
});

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('Form with elements', () => {
  it('Mount', async () => {
    act(() => {
      render(<TestNode />, node);
    });

    const form = node.children[0];
    const errorDisplay = form.children[3];

    expect(form.children.length).toBe(7);

    const firstName = form.children[0];

    expect(firstName.name).toBe('first_name');
    expect(form.children[2].innerHTML).toBe('Mark');
    expect(errorDisplay.innerHTML).toBe('');

    Simulate.change(firstName, { target: { value: 'Jhonny' } });
    await delay(500);

    expect(form.children[2].innerHTML).toBe('Jhonny');

    const submitButton = form.children[4];
    Simulate.click(submitButton);
    await delay(500);

    expect(errorDisplay.innerHTML).toBe('last name is required');

    const didChangeButton = form.children[5];
    Simulate.click(didChangeButton);
    await delay(500);

    const changeButton = form.children[6];
    Simulate.click(changeButton);
    await delay(500);
  });
});
