import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _omit from 'lodash/omit';

import Tooltip from '../Tooltip';
import './_popover.scss';

const PLACEMENT = [
  'top',
  'left',
  'right',
  'bottom',
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
  'leftTop',
  'leftBottom',
  'rightTop',
  'rightBottom'
];

/**
 * 弹出组件
 * @type {Component}
 * title 组件标题
 * content  组件内容 string/react element
 * 其他的props同Tooltip组件
 */
class Popover extends Component {
  static propTypes = {
    /**
     * 组件标题
     */
    title: PropTypes.string,
    /**
     * 组件内容
     */
    content: PropTypes.any.isRequired,
    /**
     * 组件方向
     */
    placement: PropTypes.oneOf(PLACEMENT),
    /**
     * 组件挂载容器
     */
    getPopupContainer: PropTypes.func,
    /**
     * 箭头指向中间
     */
    arrowPointAtCenter: PropTypes.bool,
    /**
     * 内容超出自动调整方向
     */
    autoAdjustOverflow: PropTypes.bool,
    /**
     * 可见化
     */
    visible: PropTypes.bool,
    /**
     * 可见状态改变回调
     */
    onVisibleChange: PropTypes.func,
    /**
     * 鼠标进入回调
     */
    mouseEnterDelay: PropTypes.number,
    /**
     * 鼠标离开回调
     */
    mouseLeaveDelay: PropTypes.number,
    /**
     * 触发动作
     */
    trigger: PropTypes.oneOf(['click', 'hover', 'focus']),
    /**
     * 内容容器类名
     */
    overlayClassName: PropTypes.string,
    /**
     * 内容容器样式
     */
    overlayStyle: PropTypes.object,
    /**
     * 渐变名称
     */
    transitionName: PropTypes.string,
    /**
     * 要显示的弹窗内容
     */
    children: PropTypes.any,
    /**
     * 业务前缀
     */
    prefixCls: PropTypes.string
  }
  constructor(props) {
    super(props);
    this.getOverlay = ::this.getOverlay;
  }

  getOverlay() {
    const { title, content } = this.props;

    return (
      <div>
        {title && <div className="nf-popover-inner-title">{title}</div>}
        <div className='nf-popover-inner-content'>
          {content}
        </div>
      </div>
    );
  }

  render() {
    return (
      <Tooltip
        {..._omit(this.props, ['title', 'content'])}
        prefixCls="nf-popover"
        content={this.getOverlay()}
      />
    );
  }
}

export default Popover;