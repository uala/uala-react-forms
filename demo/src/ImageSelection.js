import React from 'react';
import { connectFormElement } from '../../src';

const style = {
  display: 'inline-block',
  width: 100,
  height: 100,
  margin: 5,
};

/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
// eslint-disable-next-line react/prop-types
const ImageSelection = ({ name, emitEvent }) => (
  <div className="ImageSelection">
    <div
      style={style}
      onClick={() => emitEvent({ type: 'onchange', name, value: 1 })}
    >
      Image 1
    </div>
    <div
      style={style}
      onClick={() => emitEvent({ type: 'onchange', name, value: 2 })}
    >
      Image 2
    </div>
    <div
      style={style}
      onClick={() => emitEvent({ type: 'onchange', name, value: 3 })}
    >
      Image 3
    </div>
  </div>
);
/* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

export default connectFormElement(ImageSelection);
