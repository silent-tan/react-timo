export default {
  path: 'loading',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Loading').default);
    });
  }
};