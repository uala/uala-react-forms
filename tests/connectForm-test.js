import expect from "expect";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { object, string } from "yup";

import { connectForm } from "src/";

describe("Component", () => {
  let node;

  beforeEach(() => {
    node = document.createElement("div");
  });

  afterEach(() => {
    unmountComponentAtNode(node);
  });

  it("wrap with HOC without options", () => {
    const FormWithoutOptions = connectForm()(() => (
      <div>Welcome to React components</div>
    ));

    render(<FormWithoutOptions />, node, () => {
      expect(node.innerHTML).toContain("Welcome to React components");
    });
  });

  it("wrap with HOC with schema empty object", () => {
    const FormWithSchema = connectForm({ schema: {} })(() => (
      <div>Welcome to React components</div>
    ));

    render(<FormWithSchema />, node, () => {
      expect(node.innerHTML).toContain("Welcome to React components");
    });
  });

  it("wrap with HOC with yup schema", () => {
    const schema = object({
      first_name: string()
        .required("This field is required")
        .default("pippo")
    });

    const FormWithSchema = connectForm({
      schema
    })(() => <div>Welcome to React components</div>);

    render(<FormWithSchema />, node, () => {
      expect(node.innerHTML).toContain("Welcome to React components");
    });
  });
});
