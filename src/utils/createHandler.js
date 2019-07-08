const createHandler = (emitter, listener) =>
  listener
    ? (...args) => {
        emitter(...args);
        listener(...args);
      }
    : emitter;

export default createHandler;
