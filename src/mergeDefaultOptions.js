import defaultOptions from './defaultOptions';

const mergeDefaultOptions = options => ({
  ...defaultOptions,
  ...options,
});

export default mergeDefaultOptions;
