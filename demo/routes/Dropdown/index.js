export default {
  path: 'dropdown',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Dropdown').default);
    });
  }
};