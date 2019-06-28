import castInterface from '../castInterface';

import standardiseYupErrors from './standardiseYupErrors';
import UalaSchemaErrorInterface from './UalaSchemaErrorInterface';

const ALLOWED_ERROR = 'ValidationError';

const validateYupSchema = (schema, values) =>
  new Promise((resolve, reject) => {
    // Yup will throw a `ValidationError` whenever the validation fails
    schema
      .validate(values)
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
