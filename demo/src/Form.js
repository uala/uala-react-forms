import React from "react";
import { ualaForm } from "../../src";

export function Form(props) {
  return <div className="Form">{props.children}</div>;
}

export default ualaForm(Form);
