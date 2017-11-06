export default {
  path: 'transfer',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Transfer').default);
    });
  }
};