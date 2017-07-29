/**
 * 静态方法提示组件
 * @farzer 2017.06.24
 */

require('./_style.scss');
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import uuid from 'uuid';
import isString from 'lodash/isString';
import forEach from 'lodash/forEach';
import noop from 'lodash/noop';
import assign from 'lodash/assign';
import Flex from '../Flex/';

const STATIC_TIP_CONTAINER_ID = '_tm-static-tip__container ' + uuid.v1();
let tipContainer = window.document.getElementById(STATIC_TIP_CONTAINER_ID);
if(!tipContainer) {
  tipContainer = window.document.createElement('div');
  tipContainer.className = 'tm-static-tips';
  tipContainer.id = STATIC_TIP_CONTAINER_ID;
  window.document.body.appendChild(tipContainer);
}

const TipMethods = {
  tip(options) {
    const _onClose = options.onClose;
    const div = window.document.createElement('div');
    div.className = 'tm-static-tips-cell';
    tipContainer.appendChild(div);

    options.onClose = function() {
      tipContainer.removeChild(div);
      if(_onClose) {
        _onClose();
      }
    };

    ReactDOM.render(<TipOverlay { ...options }/>, div);
  },

  success(options) {
    if(isString(options)) {
      options = {
        children: options
      };
    }

    options.type = 'success';
    TipMethods.tip(options);
  },

  info(options) {
    if(isString(options)) {
      options = {
        children: options
      };
    }

    options.type = 'info';
    TipMethods.tip(options);
  },

  warning(options) {
    if(isString(options)) {
      options = {
        children: options
      };
    }

    options.type = 'warning';
    TipMethods.tip(options);
  },

  danger(options) {
    if(isString(options)) {
      options = {
        children: options
      };
    }

    options.type = 'danger';
    TipMethods.tip(options);
  },

  clear() {
    forEach(tipContainer.children, tip => {
      ReactDOM.unmountComponentAtNode(tip);
    });
  }
};

class TipOverlay extends Component {
  static propTypes = {
    title: PropTypes.string,
    type: PropTypes.oneOf([
      'success',
      'info',
      'warning',
      'danger'
    ]),
    time: PropTypes.number,
    onClose: PropTypes.func,
    children: PropTypes.any
  }

  static defaultProps = {
    title: '',
    type: 'info',
    time: 3000,
    onClose: noop
  }

  constructor(props) {
    super(props);
    this.timer = null;
    this.hadClosed = false;
    this.handleClose = ::this.handleClose;
  }

  componentDidMount() {
    const { time } = this.props;
    if(time) {
      this.timer = setTimeout(() => this.fadeOut(), time);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleClose() {
    this.fadeOut();
  }

  fadeOut() {
    if(!this.hadClosed) {
      this.hadClosed = true;
      this.props.onClose();
    }
  }
  render() {
    const {
      title,
      type,
      children
    } = this.props;

    const cellClassName = cx('animated fadeInRight');
    return (
      <div className={cellClassName}>
        <Tip
          title={ title }
          type={ type }
          onClose={ this.handleClose }
        >
          { children }
        </Tip>
      </div>
    );
  }
}

class Tip extends Component {
  static propTypes = {
    type: PropTypes.oneOf([
      'success',
      'info',
      'danger',
      'warning'
    ]),
    title: PropTypes.string,
    onClose: PropTypes.func,
    children: PropTypes.any
  }

  static defaultProps = {
    type: 'info',
    title: '',
    onClose: noop
  }

  constructor(props) {
    super(props);
    this.handleClose = ::this.handleClose;
  }

  handleClose() {
    this.props.onClose();
  }

  render() {
    const { title, type, children } = this.props;
    const iconClassName = {
      success: 'zmdi zmdi-check-circle',
      info: 'zmdi zmdi-info',
      warning: 'zmdi zmdi-alert-circle',
      danger: 'fa fa-times-circle'
    };

    return (
      <div className="tm-static-tip">
        <Flex row className={`alert alert-${type}`}>
          <Flex
            className="tm-static-tip-icon"
            justifyCenter={true}
            alignCenter={true}
          >
            <i className={`${iconClassName[type]}`}/>
          </Flex>
          {
            title ? <Flex><strong>{ title }</strong></Flex> : null
          }
          <Flex
            flex={1}
            alignCenter={true}
            className="tm-static-tip-content"
          >
            { children }
          </Flex>
          <Flex
            justifyCenter={true}
            alignCenter={true}
            className="tm-static-tip-close"
            onClick={this.handleClose}
          >关闭</Flex>
        </Flex>
      </div>
    );
  }
}

assign(Tip, TipMethods);

export default Tip;
