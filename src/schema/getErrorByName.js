/**
 * Helper to retrieve an error message by name.
 *
 * @param errors - the array of errors
 * @param name - the element name (generally match with form values)
 * @returns {*|null}
 */

const getErrorByName = (errors, name) => {
  const needle = errors.find(error => error.name === name);

  return (needle && needle.message[0]) || null;
};

export default getErrorByName;
