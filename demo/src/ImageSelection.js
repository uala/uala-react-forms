import React from "react";
import { connectFormElement } from "../../src";

const style = { display: "inline-block", width: 100, height: 100, margin: 5 };

export function ImageSelection({ name, emitEvent }) {
  return (
    <div className="ImageSelection">
      <div
        style={style}
        onClick={() => emitEvent({ type: "onchange", name, value: 1 })}
      >
        Image 1
      </div>
      <div
        style={style}
        onClick={() => emitEvent({ type: "onchange", name, value: 2 })}
      >
        Image 2
      </div>
      <div
        style={style}
        onClick={() => emitEvent({ type: "onchange", name, value: 3 })}
      >
        Image 3
      </div>
    </div>
  );
}

export default connectFormElement(ImageSelection);
