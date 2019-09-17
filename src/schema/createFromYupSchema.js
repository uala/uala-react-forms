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
  getDefaults: () => schema.default(),
  cast: (values, context = null) => {
    if (context) {
      return schema.cast(values, { context });
    }

    return schema.cast(values);
  },
});

export default createFromYupSchema;
