import expect from 'expect';
import createSchema from '../src/schema';

const schema = {
  validate: () => {},
  default: () => {},
  cast: () => {},
};

describe('Create interface from custom schema', () => {
  it('Create', () => {
    const schemaInterface = createSchema(schema, 'custom');

    expect(schemaInterface.validate).toBeA('function');
    expect(schemaInterface.getDefaults).toBeA('function');
    expect(schemaInterface.cast).toBeA('function');
  });
});
