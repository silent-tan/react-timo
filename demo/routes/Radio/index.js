export default {
  path: 'radio',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Radio').default);
    });
  }
};