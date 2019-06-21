import React from "react";
import { ualaFormItem } from "../../src";

export function TextInput({ name, onChange }) {
  return (
    <div className="TextInput">
      <input
        type="text"
        name={name}
        onChange={e => onChange(name, e.target.value)}
      />
    </div>
  );
}

export default ualaFormItem(TextInput);
