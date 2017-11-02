export default {
  path: 'notification',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Notification').default);
    });
  }
};