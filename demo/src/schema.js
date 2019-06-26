import { object, string } from 'yup';

const schema = object({
  first_name: string().required('This field is required').default('pippo'),
});

export default schema;
