export default {
  path: 'pagination',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Pagination').default);
    });
  }
};