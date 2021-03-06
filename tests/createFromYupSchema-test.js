import expect from 'expect';
import { object, string, ref } from 'yup';

import createSchema from '../src/schema';

describe('Create interface from yup schema', () => {
  it('Create', () => {
    const schema = object({ firstName: string() });
    const schemaInterface = createSchema(schema, 'yup');

    expect(schemaInterface.validate).toBeA('function');
    expect(schemaInterface.getDefaults).toBeA('function');
    expect(schemaInterface.cast).toBeA('function');

    const values = schemaInterface.cast({ firstName: 'Frank' });

    expect(values.firstName === 'Frank').toBe(true);
  });

  it('Cast with context', () => {
    const schemaWithRef = object({ firstName: string(), lastName: ref('$originalLastName') });
    const schema = createSchema(schemaWithRef, 'yup');

    expect(schema.validate).toBeA('function');
    expect(schema.getDefaults).toBeA('function');
    expect(schema.cast).toBeA('function');

    const values = schema.cast({ firstName: 'Frank' }, { originalLastName: 'Dewalt' });

    expect(values.firstName === 'Frank' && values.lastName === 'Dewalt').toBe(true);
  });
});
