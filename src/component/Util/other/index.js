// see https://github.com/react-component/util/blob/master/src/createChainedFunction.js
function createChainedFunction() {
  const args = [].slice.call(arguments, 0);
  if (args.length === 1) {
    return args[0];
  }

  return function chainedFunction() {
    for (let i = 0; i < args.length; i++) {
      if (args[i] && args[i].apply) {
        args[i].apply(this, arguments);
      }
    }
  };
}

export {
  createChainedFunction
};