import React, { Component } from "react";
import { render } from "react-dom";

import Form from "./Form";
import TextInput from "./TextInput";
import Display from "./Display";

class Demo extends Component {
  render() {
    return (
      <div>
        <Form>
          <TextInput name="first_name" />
          <Display />
        </Form>
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
