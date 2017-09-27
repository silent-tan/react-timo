export default {
  path: 'button',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Button').default);
    });
  }
};