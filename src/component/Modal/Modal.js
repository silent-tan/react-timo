/**
 * @Author: farzer
 * @Date:   2017-07-12 14:37:16
 * @Last modified by:   farzer
 * @Last modified time: 2017-08-05 15:16:18
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'rc-dialog';
import uuid from 'uuid';

import _noop from 'lodash/noop';
import _isNil from 'lodash/isNil';
import _isBoolen from 'lodash/isNil';

import Button from '../Button';
import * as Util from '../Util';

let mousePosition;
let mousePositionEventBinded;

/**
 * 模态框组件
 * @type {Component}
 * √ 表示可更改  × 表示不推荐更改
 * cancelText 取消按钮文本
 * closable 是否显示右上角关闭按钮 ×
 * keyboard 启用ESC退出模态框
 * maskClosable 点击模态框是否退出模态框
 * maskTransitionName 遮罩层动画 ×
 * onClose  模态框关闭触发回调
 * onSubmit 模态框提交触发回调
 * show 模态框状态
 * size 模态框大小
 * submitLoading  异步确认
 * submitText 确定按钮文本
 * title  模态框标题
 * transitionName 模态框动画 ×
 * width  自定义模态框宽度  ×
 */
class Modal extends Component {
  static propTypes = {
    cancelText: PropTypes.string,
    children: PropTypes.any,
    className: PropTypes.string,
    closable: PropTypes.bool,
    keyboard: PropTypes.bool,
    maskClosable: PropTypes.bool,
    maskTransitionName: PropTypes.string,
    onClose: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([false])]),
    onSubmit: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([false])]),
    show: PropTypes.bool,
    onShow: PropTypes.func,
    size: PropTypes.oneOf(['default', 'large', 'small']),
    submitLoading: PropTypes.bool,
    submitText: PropTypes.string,
    title: PropTypes.string,
    transitionName: PropTypes.string,
    width: PropTypes.any
  }
  static defaultProps = {
    cancelText: '取消',
    className: '',
    closable: false,
    keyboard: true,
    maskClosable: true,
    maskTransitionName: 'fade',
    onClose: _noop,
    onSubmit: _noop,
    show: false,
    onShow: _noop,
    size: 'default',
    submitLoading: false,
    submitText: '确定',
    title: '默认模态框',
    transitionName: 'zoom',
    width: undefined
  }

  static sizeMap = {
    default: 520,
    large: 800,
    small: 300
  }

  constructor(props) {
    super(props);
    this.handleClose = ::this.handleClose;
    this.handleSubmit = ::this.handleSubmit;
    this.renderFooter = ::this.renderFooter;
    this.state = {
      id: uuid.v1()
    };
  }

  componentDidMount() {
    if (mousePositionEventBinded) {
      return;
    }
    // 只有点击事件支持从鼠标位置动画展开
    Util.Element.addEventListener(document.documentElement, 'click', e => {
      mousePosition = {
        x: e.pageX,
        y: e.pageY
      };
      // 100ms 内发生过点击事件，则从点击位置动画展示
      // 否则直接 zoom 展示
      // 这样可以兼容非点击方式展开
      setTimeout(() => mousePosition = null, 100);
    });
    mousePositionEventBinded = true;
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.show !== this.props.show && nextProps.show) {
      this.props.onShow && this.props.onShow();
    }
  }

  handleSubmit() {
    const {onSubmit} = this.props;
    onSubmit();
  }

  handleClose() {
    const {onClose} = this.props;
    onClose();
  }

  renderFooter() {
    const {onSubmit, onClose, closable} = this.props;
    const footer = [];
    if(!_isBoolen(onSubmit)) {
      footer.push(
        <Button
          className="btn-link"
          key="submit"
          loading={this.props.submitLoading}
          onClick={this.handleSubmit}
        >{this.props.submitText}</Button>
      );
    }
    if(!_isBoolen(onClose) && !closable) {
      footer.push(
        <Button
          className="btn-link"
          key="cancel"
          onClick={this.handleClose}
        >{this.props.cancelText}</Button>
      );
    }
    return footer;
  }

  render() {
    const { show, size, width, ...rest } = this.props;

    let widthTemp = Modal.sizeMap[size];
    if(!_isNil(width)) {
      widthTemp = width;
    }

    return (
      <Dialog
        width={widthTemp}
        visible={show}
        prefixCls="nf-modal"
        onClose={this.handleClose}
        footer={this.renderFooter()}
        mousePosition={mousePosition}
        {...rest}
      />
    );
  }
}
export default Modal;