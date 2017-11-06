import _includes from 'lodash/includes';
import _isNil from 'lodash/isNil';
import _forEach from 'lodash/forEach';
import _noop from 'lodash/noop';
import _isString from 'lodash/isString';
import cx from 'classnames';

import Notification from './Notification';
import './_style.scss';

const PLACEMENT = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
const NOTICE_TYPE = ['basic', 'success', 'warning', 'danger', 'info'];

const notificationInstance = {};
let defaultDuration = 4.5;
let defaultTop = 24;
let defaultBottom = 24;
let defaultPlacement = 'topRight';

function setNotificationConfig(config = {}) {
  const {duration, top, bottom, placement} = config;
  if(!_isNil(duration)) defaultDuration = duration;
  if(!_isNil(top)) defaultTop = top;
  if(!_isNil(bottom)) defaultBottom = bottom;
  if(!_isNil(placement)) defaultPlacement = placement;
}

function getPlacementStyle(placement) {
  if(!_includes(PLACEMENT, placement)) {
    console.error(`placement: ${placement} is not existed`);
    placement = 'topRight';
  }
  let style;
  switch (placement) {
    case 'topLeft':
      style = { left: 0, top: defaultTop, bottom: 'auto' };
      break;
    case 'topRight':
      style = { right: 0, top: defaultTop, bottom: 'auto' };
      break;
    case 'bottomLeft':
      style = { left: 0, top: 'auto', bottom: defaultBottom };
      break;
    default:
      style = { right: 0, top: 'auto', bottom: defaultBottom };
      break;
  }
  return style;
}

function getNotificationInstance(placement) {
  if (!notificationInstance[placement]) {
    Notification.newInstance({
      style: getPlacementStyle(placement),
      className: `nf-notification-${placement}`
    }, (notificationInstanceTemp) => {
      notificationInstance[placement] = notificationInstanceTemp;
    });
  }
  return notificationInstance[placement];
}

function notice(argsProps = {}) {
  const duration =  argsProps.duration !== undefined ? argsProps.duration : defaultDuration;
  const closable = _isNil(argsProps.closable) ? true : argsProps.closable;
  const style = argsProps.style || {};
  const className = cx(argsProps.className || '', {
    [`nf-notification-notice-${argsProps.type}`]: true
  });
  getNotificationInstance(argsProps.placement || defaultPlacement).addNotice({
    content: argsProps.content,
    duration,
    closable,
    style,
    className,
    onClose: argsProps.onClose || _noop
  });
}

const notificationApi = {
  open: notice,
  onClose(noticeKey) {
    _forEach(notificationInstance, instance => {
      instance.removeNotice(noticeKey);
    });
  },
  config: setNotificationConfig,
  destroy() {
    _forEach(notificationInstance, (instance, placement) => {
      instance.destroy();
      delete notificationInstance[placement];
    });
  }
};

_forEach(NOTICE_TYPE, type => {
  notificationApi[type] = (args) => {
    let temp = { type };
    if(_isString(args)) {
      temp.content = args;
    } else {
      temp = { ...args, type };
    }
    notificationApi.open(temp);
  };
});

export default notificationApi;