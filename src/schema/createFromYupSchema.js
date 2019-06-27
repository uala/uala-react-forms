/**
 * Wrap Yup schema methods to validate and retrieve default values.
 *
 * @param {YupSchema} schema - the Yup schema
 * @returns {UalaSchemaWrapper} - the wrapper for a Yup schema
 */
const createFromYupSchema = schema => ({
  validate: schema.validate,
  getDefaults: schema.default,
});

export default createFromYupSchema;
