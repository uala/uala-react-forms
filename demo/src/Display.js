import React from "react";
import { ualaFormItem } from "../../src";
import TextInput from "./TextInput";

const style = {
  position: "fixed",
  right: 0,
  top: 0,
  width: 200,
  background: "#ddd"
};

export function Display({ values }) {
  return (
    <div className="Display" style={style}>
      <h3>{values.first_name}</h3>
      <h3>{values.last_name}</h3>
      <div>Image: {values.image}</div>
      {!!values.privacy && (
        <div>
          <TextInput name="notification_type" />
        </div>
      )}
    </div>
  );
}

export default ualaFormItem(Display);
