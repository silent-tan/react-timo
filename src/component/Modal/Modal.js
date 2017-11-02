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
import _isBoolean from 'lodash/isBoolean';

import Button from '../Button';
import * as Util from '../Util';

let mousePosition;
let mousePositionEventBinded;

/**
 * 模态框组件
 * @type {Component}
 */
class Modal extends Component {
  static propTypes = {
    /**
     * 取消按钮文本
     */
    cancelText: PropTypes.string,
    /**
     * 子组件
     */
    children: PropTypes.any,
    /**
     * 额外类名
     */
    className: PropTypes.string,
    /**
     * 是否显示右上角关闭按钮
     */
    closable: PropTypes.bool,
    /**
     * 启用ESC退出模态框
     */
    keyboard: PropTypes.bool,
    /**
     * 点击模态框是否退出模态框
     */
    maskClosable: PropTypes.bool,
    /**
     * 遮罩层动画
     */
    maskTransitionName: PropTypes.string,
    /**
     * 关闭回调
     */
    onClose: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([false])]),
    /**
     * 提交回调
     */
    onSubmit: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([false])]),
    /**
     * 模态框是否显示
     */
    show: PropTypes.bool,
    /**
     * 显示回调
     */
    onShow: PropTypes.func,
    /**
     * 模态框尺寸
     */
    size: PropTypes.oneOf(['default', 'large', 'small']),
    /**
     * 提交loading
     */
    submitLoading: PropTypes.bool,
    /**
     * 提交文案
     */
    submitText: PropTypes.string,
    /**
     * 模态框标题
     */
    title: PropTypes.string,
    /**
     * 模态框额外样式
     */
    style: PropTypes.object,
    /**
     * 模态框动画
     */
    transitionName: PropTypes.string,
    /**
     * 自定义模态框宽度
     */
    width: PropTypes.any
  }
  static defaultProps = {
    cancelText: '取消',
    className: '',
    closable: false,
    keyboard: false,
    maskClosable: false,
    maskTransitionName: 'fade',
    onClose: _noop,
    onSubmit: _noop,
    show: false,
    onShow: _noop,
    size: 'default',
    submitLoading: false,
    submitText: '确定',
    title: '默认模态框',
    style: {},
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
    if(!_isBoolean(onSubmit)) {
      footer.push(
        <Button
          className="btn-link"
          key="submit"
          loading={this.props.submitLoading}
          onClick={this.handleSubmit}
        >{this.props.submitText}</Button>
      );
    }
    if(!_isBoolean(onClose) && !closable) {
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