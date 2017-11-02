export default {
  path: 'checkbox',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Checkbox').default);
    });
  }
};