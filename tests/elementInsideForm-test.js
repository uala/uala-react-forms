import expect from 'expect';
import React from 'react';
import { create } from 'react-test-renderer';

import { connectForm, connectFormElement } from 'src/';

import { object, string } from 'yup';

const schema = object({
  first_name: string()
    .required('This field is required')
    .default('pippo'),
});

const Form = connectForm({ schema })(({ children }) => <div>{children}</div>);
const TextInput = connectFormElement(({ name, onChange }) => (
  <input name={name} onChange={e => onChange(name, e.target.value)} />
));
const DisplayFirstName = connectFormElement(({ values }) => <div dataValues={values}>{values.first_name}</div>);

describe('Form with elements', () => {
  it('Mount', async () => {
    let tree;
    const renderedForm = create(
      <Form>
        <TextInput name="first_name" />
        <TextInput name="last_name" />
        <DisplayFirstName />
      </Form>
    );
    tree = renderedForm.toJSON();

    expect(tree.children.length).toBe(3);
    expect(tree.children[0].props.name).toBe('first_name');
    expect(tree.children[0].props.onChange).toBeA('function');
    await tree.children[0].props.onChange({ target: { value: 'Mark' } });

    tree = renderedForm.toJSON();
    expect(tree.children[2].children[0]).toBe('Mark');
    expect(tree.children[2].props.dataValues.first_name).toBe('Mark');
  });
});
