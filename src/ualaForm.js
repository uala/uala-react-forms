import React, { useState } from "react";
import { Provider } from "./context";

const ualaForm = Target => {
  function Form(props) {
    const [values, setValues] = useState({});
    const onChange = (name, value) =>
      emitEvent({ type: "onchange", name, value });

    const emitEvent = ({ type, name, value }) => {
      switch (type) {
        case "onchange":
          setValues({ ...values, [name]: value });
          break;
        default:
          break;
      }
    };

    return (
      <Provider value={{ values, onChange, emitEvent }}>
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
