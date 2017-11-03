import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import RcDropdown from 'rc-dropdown';
import classNames from 'classnames';
import _includes from 'lodash/includes';
import _has from 'lodash/has';

export default class Dropdown extends Component {
  static propTypes = {
    /**
     * 业务前缀
     */
    prefixCls: PropTypes.string,
    /**
     * 鼠标进入延时
     */
    mouseEnterDelay: PropTypes.number,
    /**
     * 鼠标离开延时
     */
    mouseLeaveDelay: PropTypes.number,
    /**
     * 下拉方向
     */
    placement: PropTypes.oneOf(['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight']),
    /**
     * 菜单，一般为Menu组件
     */
    overlay: PropTypes.any,
    /**
     * 触发子组件
     */
    children: PropTypes.any,
    /**
     * 额外样式
     */
    style: PropTypes.object,
    /**
     * 触发下拉事件
     */
    trigger: PropTypes.oneOf(['click', 'hover']),
    /**
     * 菜单是否可见
     */
    visible: PropTypes.bool,
    /**
     * 是否可见回调
     */
    onVisibleChange: PropTypes.func,
    /**
     * 组件挂载的容器
     */
    getPopupContainer: PropTypes.func,
    /**
     * 禁止显示菜单
     */
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