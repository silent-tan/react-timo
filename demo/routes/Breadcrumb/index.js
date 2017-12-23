export default {
  path: 'breadcrumb',
  breadcrumbName: '面包屑',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Breadcrumb').default);
    });
  }
};