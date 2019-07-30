/**
 * @typedef {Object} UalaSchemaWrapper
 *
 * @property {Function} validate - validate current schema
 * @property {Function} getDefaults - retrieve schema default values
 * @property {Function} cast - Cast a new schema, with option context
 */

/**
 * @typedef {Object} YupSchema
 *
 * @property {Function} validate - Validate the schema
 * @property {Function} default - Retrieve schema default values
 * @property {Function} cast - Cast a new schema, with option context
 */

/**
 * @typedef {Object} CustomSchema
 *
 * @property {Function} validate - Validate the schema
 * @property {Function} default - Retrieve schema default values
 * @property {Function} cast - Cast a new schema, with option context
 */

/**
 * @typedef {Object} UalaValidationError
 *
 * @property {String} name - name of the field that fails
 * @property {Array<String>} errors - list of error messages relative to that field
 */

/**
 * @typedef {Object} UalaSchemaErrorInterface
 *
 * @property {Array<UalaValidationError>|null} errors
 * @property {any} originalContext
 */
