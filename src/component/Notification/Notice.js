import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _noop from 'lodash/noop';

import Flex from '../Flex';

class Notice extends Component {
  static propTypes = {
    className: PropTypes.string,
    duration: PropTypes.number,
    onClose: PropTypes.func,
    closable: PropTypes.bool,
    children: PropTypes.any,
    style: PropTypes.object,
    closeChildren: PropTypes.any
  }

  static defaultProps = {
    className: '',
    duration: 1.5,
    onClose: _noop,
    closable: true,
    closeChildren: '关闭',
    style: {
      right: '50%'
    }
  }

  constructor(props) {
    super(props);
    this.close = ::this.close;
    this.clearCloseTimer = ::this.clearCloseTimer;
    this.closeTimer = null;
  }

  componentDidMount() {
    if(this.props.duration !== null) {
      this.closeTimer = setTimeout(() => {
        this.close();
      }, this.props.duration * 1000);
    }
  }

  componentWillUnmount() {
    this.clearCloseTimer();
  }

  close() {
    const {onClose} = this.props;
    this.clearCloseTimer();
    onClose();
  }

  clearCloseTimer() {
    if(this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  render() {
    const {style, children, closeChildren, closable, className} = this.props;
    return (
      <div className={`nf-notification-notice ${className || ''}`} style={style}>
        <Flex row>
          <Flex flex className="nf-notification-notice-content">
            {children}
          </Flex>
          {
            !closable ? null :
              <Flex
                justifyCenter={true}
                alignCenter={true}
                className="nf-notification-notice-close"
                onClick={this.close}
              >
                {closeChildren}
              </Flex>
          }
        </Flex>
      </div>
    );
  }
}

export default Notice;