const getErrorByName = (errors, name) => {
  const needle = errors.find(error => error.name === name);

  return (needle && needle.message[0]) || null;
};

export default getErrorByName;
