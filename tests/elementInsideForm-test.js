import expect from 'expect';
import React from 'react';
import { create } from 'react-test-renderer';
import { object, string } from 'yup';

import { connectForm, connectFormElement } from '../src';

const schema = object({
  first_name: string()
    .required('This field is required')
    .default('Mark'),
});

const Form = connectForm({ schema })(({ children, emitSubmit }) => <div onClick={emitSubmit}>{children}</div>);

const TextInput = connectFormElement(({ name, emitChange }) => (
  <input name={name} onChange={e => emitChange(name, e.target.value)} />
));

const DisplayFirstName = connectFormElement(({ values }) => <div dataValues={values}>{values.first_name}</div>);

const TestNode = (
  <Form onSubmit={() => {}}>
    <TextInput name="first_name" />
    <TextInput name="last_name" />
    <DisplayFirstName />
  </Form>
);

describe('Form with elements', () => {
  it('Mount', async () => {
    let tree;
    const renderedForm = create(TestNode);
    tree = renderedForm.toJSON();

    expect(tree.children.length).toBe(3);
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
