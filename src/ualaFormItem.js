import React from "react";
import { Consumer } from "./context";

const ualaFormItem = Target => {
  function FormItem(props) {
    return (
      <Consumer>
        {({ values, errors, onChange, emitEvent }) => (
          <Target
            values={values}
            errors={errors}
            onChange={onChange}
            emitEvent={emitEvent}
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
