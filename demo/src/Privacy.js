import React from "react";
import { connectFormElement } from "../../src";

export function Privacy({ values }) {
  return <div className="Privacy">{values.notification_type}</div>;
}

export default connectFormElement(Privacy);
