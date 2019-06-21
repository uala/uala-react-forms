import React, { useState } from "react";
import { Provider } from "./context";

const ualaForm = Target => {
  function Form(props) {
    const [values, setValues] = useState({});
    const onChange = (name, value) => setValues({ ...values, [name]: value });
    return (
      <Provider value={{ values, onChange }}>
        <Target {...props} />
      </Provider>
    );
  }

  Form.displayName = `ualaForm(${Target.displayName ||
    Target.name ||
    "Component"})`;

  return Form;
};

export default ualaForm;
