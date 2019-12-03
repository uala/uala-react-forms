import expect from 'expect';
import React, { useEffect, useState } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import { object, string } from 'yup';

import { connectForm, connectFormElement } from '../src';

let node;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

beforeEach(() => {
  node = document.createElement('div');
});

afterEach(() => {
  unmountComponentAtNode(node);
});

describe('connectForm', () => {
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

      return <FormWithSchema initialValues={values} resetOnInitialValuesChange />;
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
      <form>
        <Input />
        <div>{`${values.first_name ? `Welcome ${values.first_name}` : 'Welcome back!'}`}</div>
      </form>
    ));

    // eslint-disable-next-line react/prop-types
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

  it('should emit submit event', async () => {
    const SimpleForm = connectForm()(({ emitSubmit, submitCount }) => (
      <form onSubmit={emitSubmit}>
        <input type="submit" value="submit" onClick={emitSubmit} />
        {submitCount && <span>{`Submitted ${submitCount} ${submitCount === 1 ? 'time' : 'times'}`}</span>}
      </form>
    ));

    const FormContainer = () => {
      const [submitCount, setSubmitCount] = useState(0);

      const handleSubmit = () => {
        setSubmitCount(submitCount + 1);
      };

      return <SimpleForm onSubmit={handleSubmit} submitCount={submitCount} />;
    };

    act(() => {
      render(<FormContainer />, node);
    });

    const form = node.children[0];
    const submitBtn = form.children[0];

    Simulate.click(submitBtn);
    await delay(300);

    expect(form.children.length).toBe(2);
    expect(form.children[1].innerHTML).toContain('Submitted 1 time');
  });

  it('should allow to set a custom external status', async () => {
    const SimpleForm = connectForm()(({ emitSubmit, externalState }) => (
      <form onSubmit={emitSubmit}>
        <input type="submit" value="submit" onClick={emitSubmit} />
        {!!externalState && <span>{`You have a new message from outer space: ${externalState.message}`}</span>}
      </form>
    ));

    const FormContainer = () => {
      const handleSubmit = ({ setExternalState }) => {
        setExternalState({ message: 'enjoy!' });
      };

      return <SimpleForm onSubmit={handleSubmit} />;
    };

    act(() => {
      render(<FormContainer />, node);
    });

    const form = node.children[0];
    const submitBtn = form.children[0];

    Simulate.click(submitBtn);
    await delay(300);

    expect(form.children.length).toBe(2);
    expect(form.children[1].innerHTML).toContain('You have a new message from outer space: enjoy!');
  });
});
