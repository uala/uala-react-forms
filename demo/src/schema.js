import { object, string, ref } from 'yup';

const schema = object({
  first_name: string()
    .required('This field is required')
    .min(4)
    .default('pippo'),
  last_name: ref('$last_name'),
});

export default schema;
