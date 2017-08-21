/**
 * @Author: farzer
 * @Date:   2017-07-12 14:37:16
 * @Last modified by:   farzer
 * @Last modified time: 2017-08-05 15:16:18
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import $ from 'jquery';
import _noop from 'lodash/noop';
import _isBoolean from 'lodash/isBoolean';

class Modal extends Component {
  static propTypes = {
    show: PropTypes.bool,
    title: PropTypes.string,
    size: PropTypes.oneOf(['default', 'large', 'small']),
    submitText: PropTypes.string,
    cancelText: PropTypes.string,
    onSubmit: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([false])]),
    onClose: PropTypes.func,
    children: PropTypes.any.isRequired
  }
  static defaultProps = {
    show: false,
    title: '默认模态框',
    size: 'default',
    submitText: '确定',
    cancelText: '取消',
    onSubmit: _noop,
    onClose: _noop
  }
  static sizeMap = {
    large: 'modal-lg',
    small: 'modal-sm',
    default: ''
  }
  constructor(props) {
    super(props);
    this.handleSubmit = ::this.handleSubmit;
    this.handleClose = ::this.handleClose;
    this.closeModal = ::this.closeModal;
    this.state = {
      id: uuid.v1()
    };
  }
  componentDidMount() {
    this.__MODAL = $(`#${this.state.id}`);
    // 创建modal实例化
    this.__MODAL.modal({
      keyboard: false,
      show: this.props.show,
      backdrop: 'static'
    });

    if (this.props.show) {
      this.displayModal();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.props.show) {
      if (nextProps.show) {
        this.displayModal();
      } else {
        this.closeModal();
      }
    }
  }
  componentWillUnmount() {
    this.__MODAL.remove();
  }

  handleClose() {
    this.props.onClose();
  }

  handleSubmit() {
    this.props.onSubmit();
  }

  closeModal() {
    this.__MODAL.modal('hide');
  }

  displayModal() {
    this.__MODAL.modal('show');
  }

  render() {
    const { title, size, submitText, cancelText, onSubmit } = this.props;

    return (
      <div className="modal" id={this.state.id}>
        <div className={`modal-dialog ${Modal.sizeMap[size]}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title pull-left">
                {title}
              </h5>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
            <div className="modal-footer">
              {
                _isBoolean(onSubmit) && onSubmit === false
                  ? null :
                  <button type="button" className="btn btn-link btn-primary waves-effect" onClick={this.handleSubmit}>
                    {submitText}
                  </button>
              }
              <button type="button" className="btn btn-link waves-effect" onClick={this.handleClose}>
                {cancelText}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Modal;