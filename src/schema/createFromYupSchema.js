import './Schema.type';

import validateYupSchema from './validateYupSchema';

/**
 * Wrap Yup schema methods to validate and retrieve default values.
 *
 * @param {YupSchema} schema - the Yup schema
 *
 * @returns {UalaSchemaWrapper} - the wrapper for a Yup schema
 */
const createFromYupSchema = schema => ({
  validate: values => validateYupSchema(schema, values),
  getDefaults: schema.default.bind(schema),
});

export default createFromYupSchema;
