import './Schema.type';
import { castInterface } from '../utils';
import UalaSchemaInterface from './UalaSchemaErrorInterface';

/**
 * Standardise Yup errors format into a map.
 *
 * @param {Object} ValidationError

 * @return {UalaSchemaErrorInterface} - the resulting errors map
 */
const standardiseYupErrors = ValidationError => {
  const map = castInterface(UalaSchemaInterface);
  map.errors = [];
  map.originalContext = { ...ValidationError };

  if (ValidationError.inner.length === 0) {
    const { path, errors } = ValidationError;

    map.errors.push({ name: path, message: [...errors] });
  } else {
    ValidationError.inner.forEach(error => {
      const namedError = map.errors.find(mappedErr => mappedErr.name === error.path);

      if (namedError) {
        namedError.message.push(...error.errors);
      } else {
        map.errors.push({ name: error.path, message: [...error.errors] });
      }
    });
  }

  return map;
};

export default standardiseYupErrors;
