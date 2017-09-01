import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import RcDropdown from 'rc-dropdown';
import classNames from 'classnames';
import _includes from 'lodash/includes';

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
    onVisibleChange: PropTypes.func,
    getPopupContainer: PropTypes.func
  }
  static defaultProps = {
    prefixCls: 'nf-dropdown',
    mouseEnterDelay: 0.15,
    mouseLeaveDelay: 0.1,
    placement: 'bottomLeft'
  };

  getTransitionName() {
    const { placement = '' } = this.props;
    if (_includes(placement, 'top')) return 'slide-down';
    return 'slide-up';
  }

  render() {
    const { children, prefixCls,trigger:triggerStr, overlay } = this.props;
    const dropdownTrigger = cloneElement(children, {
      className: classNames(children.props.className, `${prefixCls}-trigger`)
    });
    const fixedModeOverlay = cloneElement(overlay, {
      mode: 'vertical'
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