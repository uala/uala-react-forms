import React from "react";
import { ualaFormItem } from "../../src";

export function Checkbox({ name, onChange }) {
  return (
    <div className="Checkbox">
      <input
        type="checkbox"
        onChange={e => onChange(name, !!e.target.checked)}
      />
    </div>
  );
}

export default ualaFormItem(Checkbox);
