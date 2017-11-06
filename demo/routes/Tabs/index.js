export default {
  path: 'tabs',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Tabs').default);
    });
  }
};