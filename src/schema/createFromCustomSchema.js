import './Schema.type';
/**
 *
 * @param {CustomSchema} schema
 * @returns {UalaSchemaWrapper} - the wrapper for a Yup schema
 */
const createFromCustomSchema = schema => ({
  validate: schema.validate,
  getDefaults: schema.default,
});

export default createFromCustomSchema;
