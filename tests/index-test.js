import expect from "expect";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import { ualaForm } from "src/";

const Component = ualaForm(() => <div>Welcome to React components</div>);

describe("Component", () => {
  let node;

  beforeEach(() => {
    node = document.createElement("div");
  });

  afterEach(() => {
    unmountComponentAtNode(node);
  });

  it("displays a welcome message", () => {
    render(<Component />, node, () => {
      expect(node.innerHTML).toContain("Welcome to React components");
    });
  });
});
