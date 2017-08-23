import Modal from './Modal';
import confirm from './confirm';

import './_style.scss';

Modal.basic = props => {
  const config = {
    type: 'basic',
    ...props
  };
  return confirm(config);
};

Modal.info = props => {
  const config = {
    type: 'info',
    iconType: 'info-outline',
    okCancel: false,
    ...props
  };
  return confirm(config);
};

Modal.success = props => {
  const config = {
    type: 'success',
    iconType: 'check-circle',
    okCancel: false,
    ...props
  };
  return confirm(config);
};

Modal.danger = props => {
  const config = {
    type: 'danger',
    iconType: 'close-circle-o',
    okCancel: false,
    ...props
  };
  return confirm(config);
};

Modal.warning = props => {
  const config = {
    type: 'warning',
    iconType: 'alert-circle-o',
    okCancel: false,
    ...props
  };
  return confirm(config);
};

Modal.confirm = props => {
  const config = {
    type: 'warning',
    iconType: 'alert-circle-o',
    okCancel: true,
    ...props
  };
  return confirm(config);
};

export default Modal;