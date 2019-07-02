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
  validate: (values, context = {}) => validateYupSchema(schema, values, context),
  getDefaults: (context = {}) => {
    if (Object.keys(context).length === 0) {
      return schema.default();
    }

    return schema.cast({}, { context });
  },
});

export default createFromYupSchema;
