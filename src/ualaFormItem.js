import React from "react";
import { Consumer } from "./context";

const ualaFormItem = Target => {
  function FormItem(props) {
    return (
      <Consumer>
        {({ values, errors, onChange }) => (
          <Target
            values={values}
            errors={errors}
            onChange={onChange}
            {...props}
          />
        )}
      </Consumer>
    );
  }

  FormItem.displayName = `ualaFormItem(${Target.displayName ||
    Target.name ||
    "Component"})`;

  return FormItem;
};

export default ualaFormItem;
