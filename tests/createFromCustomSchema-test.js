import expect from 'expect';
import createSchema from '../src/schema';

const schema = {
  validate: () => {},
  default: () => {},
};

describe('Create interface from custom schema', () => {
  it('Create', () => {
    const schemaInterface = createSchema(schema, 'custom');

    expect(schemaInterface.validate).toBeA('function');
    expect(schemaInterface.getDefaults).toBeA('function');
  });
});
