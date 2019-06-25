import React from "react";
import { connectFormElement } from "../../src";

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

export default connectFormElement(Checkbox);
