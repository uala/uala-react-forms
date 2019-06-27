import createFromYupSchema from './createFromYupSchema';
import createFromCustomSchema from './createFromCustomSchema';

/**
 * @typedef {Object} YupSchema
 * @property {Function} validate - Validate the schema
 * @property {Function} default - Retrieve schema default values
 */

/**
 * @typedef {Object} CustomSchema
 * @property {Function} validate - validate current schema
 * @property {Function} defaults - retrieve schema default values
 */

/**
 * @typedef {Object} UalaSchemaWrapper
 * @property {Function} validate - validate current schema
 * @property {Function} getDefaults - retrieve schema default values
 */

const createSchema = (schema, vendor) => {
  const schemaFactory = {};

  switch (vendor) {
    case 'yup':
      return Object.assign({}, schemaFactory, createFromYupSchema(schema));
    case 'custom':
    default:
      return Object.assign({}, schemaFactory, createFromCustomSchema(schema));
  }
};

export default createSchema;
