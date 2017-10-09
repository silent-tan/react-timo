export default {
  path: 'collapse',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Collapse').default);
    });
  }
};