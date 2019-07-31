const shallowCompare = (obj1, obj2) => {
  if (typeof obj1 === 'object' && typeof obj2 === 'object') {
    return (
      Object.keys(obj1).length === Object.keys(obj2).length &&
      Object.keys(obj1).every(key => Object.hasOwnProperty.call(obj2, key) && obj1[key] === obj2[key])
    );
  }

  return obj1 === obj2;
};

export default shallowCompare;
