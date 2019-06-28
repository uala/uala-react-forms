import castInterface from '../castInterface';
import UalaSchemaInterface from './UalaSchemaErrorInterface';

/**
 * Standardise Yup errors format into a map.
 *
 * @param {Object} ValidationError

 * @return {UalaSchemaErrorInterface} - the resulting errors map
 */
const standardiseYupErrors = ValidationError => {
  const map = castInterface(UalaSchemaInterface);

  if (ValidationError.inner.length === 0) {
    const { path, message } = ValidationError;

    map.errors = Object.assign({}, { [path]: message });
    map.originalContext = Object.assign({}, ValidationError);
  }

  return map;
};

export default standardiseYupErrors;
