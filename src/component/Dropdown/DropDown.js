import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Trigger from 'rc-trigger';
import placements from './placements';
import cx from 'classnames';

import _noop from 'lodash/noop';
import _has from 'lodash/has';
import _isString from 'lodash/isString';
import _includes from 'lodash/includes';

class Dropdown extends Component {
  static propTypes = {
    children: PropTypes.any,
    defaultVisible: PropTypes.bool,
    onVisibleChange: PropTypes.func,
    overlay: PropTypes.node,
    placement: PropTypes.string,
    prefixCls: PropTypes.string,
    trigger: PropTypes.string,
    visible: PropTypes.bool
  };

  static defaultProps = {
    defaultVisible: false,
    onVisibleChange: _noop,
    placement: 'bottomLeft',
    prefixCls: 'nf-dropdown',
    trigger: 'hover'
  }

  constructor(props) {
    super(props);
    this.onClick = ::this.onClick;
    this.onVisibleChange = ::this.onVisibleChange;
    this.getMenuElement = ::this.getMenuElement;
    this.getPopupDomNode = ::this.getPopupDomNode;
    this.getTransitionName = ::this.getTransitionName;
    this.afterVisibleChange = ::this.afterVisibleChange;
    const visible = _has(props, 'visible') ? props.visible : props.defaultVisible;
    this.state = {visible};
  }

  componentWillReceiveProps({ visible }) {
    if (visible !== undefined) {
      this.setState({ visible });
    }
  }

  onClick = (e) => {
    const props = this.props;
    const overlayProps = props.overlay.props;
    // do no call onVisibleChange, if you need click to hide, use onClick and control visible
    if (!_has(props, 'visible')) {
      this.setState({
        visible: false
      });
    }
    if (overlayProps.onClick) {
      overlayProps.onClick(e);
    }
  }

  onVisibleChange(visible) {
    const props = this.props;
    if (!_has(props, 'visible')) {
      this.setState({ visible });
    }
    props.onVisibleChange(visible);
  }

  getMenuElement() {
    const { overlay, prefixCls } = this.props;
    const fixedModeOverlay = cloneElement(overlay, {
      mode: 'vertical'
    });
    const extraOverlayProps = {
      prefixCls: `${prefixCls}-menu`,
      onClick: this.onClick
    };
    if (_isString(fixedModeOverlay.type)) {
      delete extraOverlayProps.prefixCls;
    }
    return cloneElement(fixedModeOverlay, extraOverlayProps);
  }

  getPopupDomNode() {
    return this.refsTrigger.getPopupDomNode();
  }

  getTransitionName() {
    const { placement = '' } = this.props;
    if(_includes(placement, 'top')) return 'slide-down';
    return 'slide-up';
  }

  afterVisibleChange = (visible) => {
    if (visible) {
      const overlayNode = this.getPopupDomNode();
      // TODO
      const rootNode = ReactDOM.findDOMNode(this);  // eslint-disable-line
      if (rootNode.offsetWidth > overlayNode.offsetWidth) {
        overlayNode.style.width = `${rootNode.offsetWidth}px`;
        if (_has(this.refsTrigger, '_component.alignInstance')) {
          this.refsTrigger._component.alignInstance.forceAlign();
        }
      }
    }
  }

  render() {
    const {
      prefixCls,
      children,
      placement,
      trigger: triggerStr,
      ...otherProps
    } = this.props;

    const trigger = [triggerStr];

    const dropdownTrigger = cloneElement(children, {
      className: cx(children.props.className, `${prefixCls}-trigger`)
    });

    return (
      <Trigger
        {...otherProps}
        prefixCls={prefixCls}
        ref={refsNode => this.refsTrigger = refsNode}
        builtinPlacements={placements}
        action={trigger}
        showAction={[]}
        hideAction={[]}
        popupPlacement={placement}
        popupTransitionName={this.getTransitionName()}
        popupVisible={this.state.visible}
        afterPopupVisibleChange={this.afterVisibleChange}
        popup={this.getMenuElement()}
        onPopupVisibleChange={this.onVisibleChange}
      >
        {dropdownTrigger}
      </Trigger>
    );
  }
}

export default Dropdown;