export default {
  path: 'select',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Select').default);
    });
  }
};