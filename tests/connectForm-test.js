import expect from 'expect';
import React, { useEffect, useState } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import { object, string } from 'yup';

import { connectForm } from '../src';

describe('connectForm', () => {
  let node;

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
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    const schema = object({
      first_name: string().when('$first_name', (value, field) => field.default(value)),
    });

    const FormWithSchema = connectForm({
      schema,
    })(({ values }) => <div>{`${values.first_name ? `Welcome ${values.first_name}` : 'Welcome back!'}`}</div>);

    const FormContainer = () => {
      const [context, setContext] = useState({});

      useEffect(() => {
        const timeout = setTimeout(() => {
          setContext({ first_name: 'Pippo' });
        }, 500);
        return () => clearTimeout(timeout);
      }, []);

      return <FormWithSchema context={context} />;
    };

    act(() => {
      render(<FormContainer />, node);
    });

    expect(node.innerHTML).toContain('Welcome back');

    await delay(1500);

    expect(node.innerHTML).toContain('Welcome Pippo');
  });
});
