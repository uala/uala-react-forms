import './Schema.type';

import createFromYupSchema from './createFromYupSchema';
import createFromCustomSchema from './createFromCustomSchema';

/**
 *
 * @param {any} schema
 * @returns {UalaSchemaWrapper} - the schema wrapper
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
