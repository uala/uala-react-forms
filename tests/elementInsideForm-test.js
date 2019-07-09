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

// eslint-disable-next-line react/prop-types
const TextInput = ({ name, emitDidChange }) => (
  <FormElement>
    {({ emitChange }) => <input name={name} onChange={e => emitChange(name, e.target.value)} onBlur={emitDidChange} />}
  </FormElement>
);

const DisplayFirstName = () => (
  <FormElement>{({ values }) => <div dataValues={values}>{values.first_name}</div>}</FormElement>
);

// eslint-disable-next-line react/prop-types
const Errors = ({ name }) => <FormElement>{({ errors }) => <div>{getErrorByName(errors, name)}</div>}</FormElement>;

const TestNode = (
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

describe('Form with elements', () => {
  it('Mount', async () => {
    let tree;
    const renderedForm = create(TestNode);
    tree = renderedForm.toJSON();

    expect(tree.children.length).toBe(7);
    expect(tree.children[0].props.name).toBe('first_name');
    expect(tree.children[2].children[0]).toBe('Mark');
    expect(tree.children[2].props.dataValues.first_name).toBe('Mark');
    expect(tree.children[0].props.onChange).toBeA('function');

    await tree.children[0].props.onChange({ target: { value: 'Jhonny' } });
    tree = renderedForm.toJSON();
    expect(tree.children[2].children[0]).toBe('Jhonny');
    expect(tree.children[2].props.dataValues.first_name).toBe('Jhonny');

    await tree.children[4].props.onClick();
    tree = renderedForm.toJSON();

    await tree.children[5].props.onClick();
    tree = renderedForm.toJSON();

    await tree.children[6].props.onClick();
    tree = renderedForm.toJSON();

    expect(tree.children[2].children[0]).toBe('Jhonny');
    expect(tree.children[2].props.dataValues.first_name).toBe('Jhonny');
  });
});
