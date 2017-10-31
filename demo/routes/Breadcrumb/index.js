export default {
  path: 'breadcrumb',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Breadcrumb').default);
    });
  }
};