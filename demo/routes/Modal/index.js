export default {
  path: 'modal',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Modal').default);
    });
  }
};