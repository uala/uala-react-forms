import expect from 'expect';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';

import { object, string } from 'yup';
import { connectForm, connectFormElement } from '../src';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('lazy validation', () => {
  const FIELD_NAME = 'username';

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const customer = object({
    [FIELD_NAME]: string()
      .required(`${FIELD_NAME} is required`)
      .when('$min_length', (minLen, schema) => (minLen === 0 || minLen > 0 ? schema.min(minLen) : schema))
      .default('in'),
  });

  const Form = connectForm({ schema: customer, validationMode: 'onchange' })(({ children, onSubmit, onChange }) => (
    <form className="Form" onChange={onChange} onSubmit={onSubmit}>
      {children}
    </form>
  ));

  const Input = connectFormElement(({ name, emitChange, emitDidChange, values, errors }) => {
    const inputErrors = (errors || []).find(err => err.name === name);
    return (
      <div className="TextInput">
        <input
          type="text"
          name={name}
          value={values[name]}
          onChange={e => emitChange(name, e.target.value)}
          onBlur={e => emitDidChange(name, e.target.value)}
        />
        {inputErrors && <span>USERNAME ERROR</span>}
      </div>
    );
  });

  const LazyValidation = () => {
    const [formContext, setFormContext] = useState({ min_length: 0 });

    useEffect(() => {
      const timeout = setTimeout(() => {
        setFormContext({ min_length: 3 });
      }, 500);
      return () => clearTimeout(timeout);
    }, []);

    return (
      <Form context={formContext}>
        <Input name={FIELD_NAME} />
      </Form>
    );
  };
  it('Validate after context change and input change', async () => {
    act(() => {
      ReactDOM.render(<LazyValidation />, container);
    });

    expect(container.querySelector('input').name).toBe(FIELD_NAME);

    await delay(600);

    act(() => {
      Simulate.change(container.querySelector('input'));
    });

    await delay(50);

    expect(container.querySelector('.TextInput').innerHTML).toContain('USERNAME ERROR');
  });

  it('Validate after context change automatically', async () => {
    act(() => {
      ReactDOM.render(<LazyValidation />, container);
    });

    expect(container.querySelector('input').name).toBe(FIELD_NAME);

    await delay(50);

    act(() => {
      Simulate.change(container.querySelector('input'));
    });

    await delay(600);

    expect(container.querySelector('.TextInput').innerHTML).toContain('USERNAME ERROR');
  });
});
