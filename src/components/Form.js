import { useMemo } from 'react';
import { connectForm } from '../hoc';

const Form = ({ validationMode, schema, children, ...rest }) => {
  const hocWithOptions = useMemo(() => {
    return connectForm({ validationMode, schema })(props => {
      return children(props);
    });
  }, [validationMode, schema]);

  return hocWithOptions(rest);
};

export default Form;
