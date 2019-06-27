import defaultOptions from './defaultOptions';

const mergeDefaultOptions = options => Object.assign({}, defaultOptions, options);

export default mergeDefaultOptions;
