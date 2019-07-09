import expect from 'expect';
import { createHandler } from '../src/utils';

describe('Create handler', () => {
  let fromEmitter = false;
  let fromListener = false;

  const emitter = () => {
    fromEmitter = true;
  };
  const listener = () => {
    fromListener = true;
  };

  it('Should create handler with emitter and listener', () => {
    const handler = createHandler(emitter, listener, "I'm a function");

    expect(fromEmitter).toBe(false);
    expect(fromListener).toBe(false);

    handler();

    expect(fromEmitter).toBe(true);
    expect(fromListener).toBe(true);
  });
});
