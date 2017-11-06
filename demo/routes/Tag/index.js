export default {
  path: 'tag',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Tag').default);
    });
  }
};