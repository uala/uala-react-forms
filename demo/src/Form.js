import React from "react";
import { connectForm } from "../../src";

export function Form(props) {
  return <div className="Form">{props.children}</div>;
}

export default connectForm(Form);
