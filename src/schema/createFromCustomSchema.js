import './Schema.type';
/**
 *
 * @param {CustomSchema} schema
 * @returns {UalaSchemaWrapper} - the wrapper for a Yup schema
 */
const createFromCustomSchema = schema => ({
  validate: schema.validate.bind(schema),
  getDefaults: schema.default.bind(schema),
});

export default createFromCustomSchema;
