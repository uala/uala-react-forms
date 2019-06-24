import React from "react";
import { ualaFormItem } from "../../src";

const style = { display: "inline-block", width: 100, height: 100, margin: 5 };

export function ImageSelection({ name, onChange }) {
  return (
    <div className="ImageSelection">
      <div style={style} onClick={() => onChange(name, 1)}>
        Image 1
      </div>
      <div style={style} onClick={() => onChange(name, 2)}>
        Image 2
      </div>
      <div style={style} onClick={() => onChange(name, 3)}>
        Image 3
      </div>
    </div>
  );
}

export default ualaFormItem(ImageSelection);
