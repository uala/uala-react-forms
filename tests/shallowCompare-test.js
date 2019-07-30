import expect from 'expect';

import { shallowCompare } from '../src/utils';

describe('Shallow compare', () => {
  it('should return true', () => {
    const emptyA = {};
    const emptyB = {};

    expect(shallowCompare(emptyA, emptyB)).toBe(true);

    const stringA = 'donald';
    const stringB = 'donald';

    expect(shallowCompare(stringA, stringB)).toBe(true);

    const objA = { name: 'Donald', surname: 'Duck' };
    const objB = { name: 'Donald', surname: 'Duck' };

    expect(shallowCompare(objA, objB)).toBe(true);
  });

  it('should return false', () => {
    expect(shallowCompare({}, { foo: 1 })).toBe(false);

    expect(shallowCompare(null, undefined)).toBe(false);
  });
});
