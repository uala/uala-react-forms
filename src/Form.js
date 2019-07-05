import connectForm from './connectForm';

const Form = ({ validationMode, schema, children, ...rest }) => {
  return connectForm({ validationMode, schema })(props => {
    return children(props);
  })(rest);
};

export default Form;
