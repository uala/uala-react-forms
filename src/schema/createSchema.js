import './Schema.type';

import createFromYupSchema from './createFromYupSchema';
import createFromCustomSchema from './createFromCustomSchema';

/**
 * Create a convenient schema wrapper to access validate and defaults methods.
 *
 * @param {Object|null} schema - the schema model
 * @param {string} vendor - the vendor name. E.g. yup
 * @returns {UalaSchemaWrapper} - the schema wrapper
 */
const createSchema = (schema, vendor) => {
  const schemaFactory = {};

  switch (vendor) {
    case 'yup':
      return {
        ...schemaFactory,
        ...createFromYupSchema(schema),
      };
    case 'custom':
    default:
      return {
        ...schemaFactory,
        ...createFromCustomSchema(schema),
      };
  }
};

export default createSchema;
