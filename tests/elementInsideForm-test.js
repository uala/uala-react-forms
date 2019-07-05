import expect from 'expect';
import React from 'react';
import { create } from 'react-test-renderer';
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

const TextInput = ({ name }) => (
  <FormElement>
    {({ emitChange }) => <input name={name} onChange={e => emitChange(name, e.target.value)} />}
  </FormElement>
);

const DisplayFirstName = () => (
  <FormElement>{({ values }) => <div dataValues={values}>{values.first_name}</div>}</FormElement>
);

const Errors = ({ name }) => <FormElement>{({ errors }) => <div>{getErrorByName(errors, name)}</div>}</FormElement>;

const TestNode = (
  <Form schema={schema} onSubmit={() => {}}>
    {({ emitSubmit }) => (
      <div onClick={emitSubmit}>
        <TextInput name="first_name" />
        <TextInput name="last_name" />
        <DisplayFirstName />
        <Errors name="last_name" />
      </div>
    )}
  </Form>
);

describe('Form with elements', () => {
  it('Mount', async () => {
    let tree;
    const renderedForm = create(TestNode);
    tree = renderedForm.toJSON();

    expect(tree.children.length).toBe(4);
    expect(tree.children[0].props.name).toBe('first_name');
    expect(tree.children[2].children[0]).toBe('Mark');
    expect(tree.children[2].props.dataValues.first_name).toBe('Mark');
    expect(tree.children[0].props.onChange).toBeA('function');

    await tree.children[0].props.onChange({ target: { value: 'Jhonny' } });
    tree = renderedForm.toJSON();
    expect(tree.children[2].children[0]).toBe('Jhonny');
    expect(tree.children[2].props.dataValues.first_name).toBe('Jhonny');

    await tree.props.onClick();
    tree = renderedForm.toJSON();

    expect(tree.children[2].children[0]).toBe('Jhonny');
    expect(tree.children[2].props.dataValues.first_name).toBe('Jhonny');
  });
});
