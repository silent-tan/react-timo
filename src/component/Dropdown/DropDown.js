import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import RcDropdown from 'rc-dropdown';
import classNames from 'classnames';
import _includes from 'lodash/includes';
import _has from 'lodash/has';

export default class Dropdown extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    mouseEnterDelay: PropTypes.number,
    mouseLeaveDelay: PropTypes.number,
    placement: PropTypes.string,
    overlay: PropTypes.any,
    children: PropTypes.any,
    style: PropTypes.object,
    align: PropTypes.object,
    trigger: PropTypes.oneOf(['click', 'hover']),
    visible: PropTypes.bool,
    onVisibleChange: PropTypes.func,
    getPopupContainer: PropTypes.func,
    disabled: PropTypes.bool
  }
  static defaultProps = {
    prefixCls: 'nf-dropdown',
    mouseEnterDelay: 0.15,
    mouseLeaveDelay: 0.1,
    placement: 'bottomLeft',
    disabled: false
  };

  getTransitionName() {
    const { placement = '' } = this.props;
    if (_includes(placement, 'top')) return 'slide-down';
    return 'slide-up';
  }

  render() {
    const { children, prefixCls,trigger:triggerStr, overlay, disabled } = this.props;
    const dropdownTrigger = cloneElement(children, {
      className: classNames(children.props.className, `${prefixCls}-trigger`),
      disabled
    });
    const overProps = overlay && overlay.props;
    const selectable = _has(overProps, 'selectable') ? overProps.selectable : false;
    const fixedModeOverlay = cloneElement(overlay, {
      mode: 'vertical',
      selectable
    });
    const trigger = [triggerStr];
    return (
      <RcDropdown
        transitionName={this.getTransitionName()}
        {...this.props}
        trigger={trigger}
        overlay={fixedModeOverlay}
      >
        {dropdownTrigger}
      </RcDropdown>
    );
  }
}