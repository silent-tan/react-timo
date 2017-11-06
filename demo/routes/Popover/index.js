export default {
  path: 'popover',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Popover').default);
    });
  }
};