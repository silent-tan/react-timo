export default {
  path: 'grid',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Grid').default);
    });
  }
};