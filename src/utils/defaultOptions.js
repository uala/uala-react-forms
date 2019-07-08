import { ON_SUBMIT } from '../hoc/connectForm.events';

const defaultOptions = {
  vendor: 'yup',
  validationMode: ON_SUBMIT,
  statePropagation: false,
};

export default defaultOptions;
