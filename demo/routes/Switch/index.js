export default {
  path: 'switch',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Switch').default);
    });
  }
};