let EmitterStoreFn = function EmitterStoreFn() {};

EmitterStoreFn.prototype.update = function ( store ) {
  let i = store.length - 1;
  for (; i >= 0; i--) {
    store[i].updateEmitter();
    // store[i].renderEmitter( ctx );
  }
};

export { EmitterStoreFn };