export default {
  path: 'sheet',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Sheet').default);
    });
  }
};