import './Schema.type';
import castInterface from '../castInterface';

import standardiseYupErrors from './standardiseYupErrors';
import UalaSchemaErrorInterface from './UalaSchemaErrorInterface';

const ALLOWED_ERROR = 'ValidationError';

/**
 * Validate the form values using a Yup schema. The validation runs asynchronously
 * and returns a promise.
 * Once validation ends, the promise will contain the validation result.
 *
 * @param {YupSchema} schema - the validation schema
 * @param {Object} values - the form values
 * @param {any} [context] - the additional context, if any
 *
 * @returns {Promise<any>}
 */
const validateYupSchema = (schema, values, context = {}) =>
  new Promise((resolve, reject) => {
    // Yup will throw a `ValidationError` whenever the validation fails
    schema
      .validate(values, { abortEarly: false, context })
      .then(() => {
        // Resolve with an empty error map
        resolve(castInterface(UalaSchemaErrorInterface));
      })
      .catch(error => {
        if (error.name === ALLOWED_ERROR) {
          resolve(standardiseYupErrors(error));
        } else {
          reject(error);
        }
      });
  });

export default validateYupSchema;
