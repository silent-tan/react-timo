export default {
  path: 'clipboard',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Clipboard').default);
    });
  }
};