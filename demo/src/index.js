import React, { Component } from "react";
import { render } from "react-dom";

import Form from "./Form";
import TextInput from "./TextInput";
import Checkbox from "./Checkbox";
import Display from "./Display";
import Privacy from "./Privacy";
import ImageSelection from "./ImageSelection";

class Demo extends Component {
  render() {
    return (
      <div>
        <Form>
          <TextInput name="first_name" />
          <TextInput name="last_name" />
          <label>
            Privacy
            <Checkbox name="privacy" />
          </label>
          <div>
            <ImageSelection name="image" />
          </div>
          <Privacy />
          <Display />
        </Form>
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
