import React from "react";
import { ualaFormItem } from "../../src";

export function Privacy({ values }) {
  return <div className="Privacy">{values.notification_type}</div>;
}

export default ualaFormItem(Privacy);
