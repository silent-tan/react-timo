export default {
  path: 'card',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Card').default);
    });
  }
};