import { connectFormElement } from '../hoc';

const FormElement = connectFormElement(({ children, ...rest }) => children(rest));

FormElement.displayName = 'FormElement';

export default FormElement;
