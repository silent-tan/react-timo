export default {
  path: 'searchselect',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/SearchSelect').default);
    });
  }
};