export default {
  path: 'datetimepicker',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/DatetimePicker').default);
    });
  }
};