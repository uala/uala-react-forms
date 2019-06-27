import expect from 'expect';
import React from 'react';
import { create } from 'react-test-renderer';

import { connectFormElement } from 'src/';

const TextInput = connectFormElement(({ name }) => <input name={name} />);

describe('connectFormElement', () => {
  it('Mount', () => {
    const tree = create(<div>
        <TextInput name="first_name" />
        <TextInput name="last_name" />
      </div>,).toJSON();

    expect(tree.children.length).toBe(2);
    expect(tree.children[0].props.name).toBe('first_name');
  });
});
