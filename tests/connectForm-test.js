import expect from 'expect';
import React, { useEffect, useState } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import { object, string } from 'yup';

import { connectForm } from '../src';
import connectFormElement from '../src/hoc/connectFormElement';

describe('connectForm', () => {
  let node;
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  beforeEach(() => {
    node = document.createElement('div');
  });

  afterEach(() => {
    unmountComponentAtNode(node);
  });

  it('wrap with HOC without options', () => {
    const FormWithoutOptions = connectForm()(() => <div>Welcome to React components</div>);

    render(<FormWithoutOptions />, node, () => {
      expect(node.innerHTML).toContain('Welcome to React components');
    });
  });

  it('wrap with HOC with schema empty object', () => {
    const FormWithSchema = connectForm({ schema: {} })(() => <div>Welcome to React components</div>);

    render(<FormWithSchema />, node, () => {
      expect(node.innerHTML).toContain('Welcome to React components');
    });
  });

  it('wrap with HOC with yup schema', () => {
    const schema = object({
      first_name: string()
        .required('This field is required')
        .default('pippo'),
    });

    const FormWithSchema = connectForm({
      schema,
    })(() => <div>Welcome to React components</div>);

    render(<FormWithSchema />, node, () => {
      expect(node.innerHTML).toContain('Welcome to React components');
    });
  });

  it('should re-render if default values changes', async () => {
    const schema = object({
      first_name: string(),
    });

    const FormWithSchema = connectForm({
      schema,
    })(({ values }) => <div>{`${values.first_name ? `Welcome ${values.first_name}` : 'Welcome back!'}`}</div>);

    const FormContainer = () => {
      const [values, setValues] = useState({});

      useEffect(() => {
        const timeout = setTimeout(() => {
          setValues({ first_name: 'Pippo' });
        }, 500);
        return () => clearTimeout(timeout);
      }, []);

      return <FormWithSchema initialValues={values} />;
    };

    act(() => {
      render(<FormContainer />, node);
    });

    expect(node.innerHTML).toContain('Welcome back');

    await delay(550);

    expect(node.innerHTML).toContain('Welcome Pippo');
  });

  it('should not re-render if default values changes', async () => {
    const schema = object({
      first_name: string().default('Mark'),
    });

    const Input = connectFormElement(({ values, emitChange }) => (
      <input
        name="first_name"
        defaultValue={values.first_name}
        onChange={({ target: { value } }) => emitChange('first_name', value)}
      />
    ));

    const FormWithSchema = connectForm({
      schema,
    })(({ values }) => (
      <div>
        <Input />
        <div>{`${values.first_name ? `Welcome ${values.first_name}` : 'Welcome back!'}`}</div>
      </div>
    ));

    const FormContainer = () => {
      const [values, setValues] = useState({});

      useEffect(() => {
        const timeout = setTimeout(() => {
          setValues({ first_name: 'Pippo' });
        }, 500);
        return () => clearTimeout(timeout);
      }, []);

      const handleChange = () => {};

      return <FormWithSchema initialValues={values} onChange={handleChange} />;
    };

    act(() => {
      render(<FormContainer />, node);
    });

    const form = node.children[0];
    const input = form.children[0];

    expect(form.children[1].innerHTML).toContain('Welcome Mark');

    Simulate.change(input, { target: { value: 'Jhonny' } });

    await delay(650);

    expect(form.children[1].innerHTML).toContain('Welcome Jhonny');
  });
});
