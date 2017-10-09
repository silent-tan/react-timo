export default {
  path: 'flex',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Flex').default);
    });
  }
};