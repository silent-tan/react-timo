import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Animate from 'rc-animate';
import uuid from 'uuid';

import _map from 'lodash/map';
import _find from 'lodash/find';
import _reject from 'lodash/reject';

import Notice from './Notice';

class Notification extends Component {
  static propTypes = {
    className: PropTypes.string,
    transitionName: PropTypes.string,
    animate: PropTypes.string,
    style: PropTypes.object
  }

  static defaultProps = {
    className: '',
    animate: 'fade',
    style: {
      top: 65,
      left: '50%'
    }
  }

  constructor(props) {
    super(props);
    this.add = ::this.add;
    this.remove = ::this.remove;
    this.getTransitionName = ::this.getTransitionName;
    this.state = {
      notices: []
    };
  }

  add(noticeProps) {
    const key = noticeProps.key = uuid.v1();
    this.setState(({notices}) => {
      if(!_find(notices, {key})) {
        return {
          notices: [...notices, noticeProps]
        };
      }
    });
  }

  remove(noticeKey) {
    const preNotices = [...this.state.notices];
    const notices = _reject(preNotices, {key: noticeKey});
    this.setState({
      notices
    });
  }

  getTransitionName() {
    let {transitionName} = this.props;
    const {animate} = this.props;
    if(!transitionName && animate) {
      transitionName = `nf-notification-${animate}`;
    }
    return transitionName;
  }

  render() {
    const {className, style} = this.props;
    const notificationCls = cx('nf-notification', {
      [className]: !!className
    });
    const noticeNodes = _map(this.state.notices, notice => {
      const {key, content, onClose, ...restNoticeProps} = notice;
      const onCloseCombined = () => {
        this.remove(key);
        onClose();
      };
      return (
        <Notice
          key={key}
          {...restNoticeProps}
          onClose={onCloseCombined}
        >
          {content}
        </Notice>
      );
    });
    return (
      <div className={notificationCls} style={style}>
        <Animate transitionName={this.getTransitionName()}>
          { noticeNodes }
        </Animate>
      </div>
    );
  }
}

Notification.newInstance = (props = {}) => {
  const div = window.document.createElement('div');
  window.document.body.appendChild(div);
  // TODO:
  const notification = ReactDOM.render(<Notification {...props}/>, div);  // eslint-disable-line
  return {
    addNotice(noticeProps) {
      notification.add(noticeProps);
    },
    removeNotice(noticeKey) {
      notification.remove(noticeKey);
    },
    component: notification,
    destroy() {
      ReactDOM.unmountComponentNode(div);
      window.document.body.removeChild(div);
    }
  };
};

export default Notification;