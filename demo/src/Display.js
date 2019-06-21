import React from "react";
import { ualaFormItem } from "../../src";

export function Display({ values }) {
  return <div className="Display">{values.first_name}</div>;
}

export default ualaFormItem(Display);
