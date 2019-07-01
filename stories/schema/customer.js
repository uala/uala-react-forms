import { object, string } from 'yup';

export const customer = object({
  first_name: string()
    .required('first_name is required')
    .default('Mark'),
  last_name: string()
    .required('last_name is required')
    .default('Smith'),
  username: string()
    .required('last_name is required')
    .when('$min_username_length', (minLen, schema) => (minLen === 0 || minLen > 0 ? schema.min(minLen) : schema))
    .default('in'),
});
