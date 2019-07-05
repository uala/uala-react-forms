import connectFormElement from '../hoc/connectFormElement';

const FormElement = connectFormElement(({ children, ...rest }) => children(rest));

FormElement.displayName = 'FormElement';

export default FormElement;
