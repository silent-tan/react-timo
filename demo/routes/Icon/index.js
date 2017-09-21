export default {
  path: 'icon',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Icon').default);
    });
  }
};