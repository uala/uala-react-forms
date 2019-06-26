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

/**
 * Wrap Yup schema methods to validate and retrieve default values.
 *
 * @param {YupSchema} schema - the Yup schema
 * @returns {UalaSchemaWrapper} - the wrapper for a Yup schema
 */
const createFromYupSchema = schema => ({
  validate: value => schema.validate(value),
  getDefaults: () => schema.default(),
});

/**
 *
 * @param {CustomSchema} schema
 * @returns {UalaSchemaWrapper} - the wrapper for a Yup schema
 */
const createFromCustomSchema = schema => ({
  validate: () => schema.validate(),
  getDefaults: () => schema.defaults(),
});

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
