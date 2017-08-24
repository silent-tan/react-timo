/**
 * @Author: farzer
 * @Date:   2017-08-24 09:49:27
 * @Last modified by:   farzer
 * @Last modified time: 2017-08-24 12:36:16
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import _noop from 'lodash/noop';
import _has from 'lodash/has';

import './_style.scss';

/**
 * 开关组件: 只用于明确意义的开关场景, 比如是否，开关
 * @type {Component}
 * type 开关类型
 * checked 开关状态
 * className 类名样式
 * defaultChecked 默认开关状态
 * disabled 是否禁止切换开关
 * onChange 开关改变回调
 * onClick  点击开关回调
 */
class Switch extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['primary', 'success', 'info', 'warning', 'danger']),
    checked: PropTypes.bool,
    className: PropTypes.string,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onClick: PropTypes.func
  }

  static defaultProps = {
    type: 'primary',
    className: '',
    defaultChecked: false,
    onChange: _noop,
    onClick: _noop
  }

  static colorMap = {
    primary: '#2196F3',
    success: '#32C787',
    info: '#00BCD4',
    warning: '#FFEB3B',
    danger: '#FF6B68'
  }

  constructor(props) {
    super(props);
    this.handleToggle = ::this.handleToggle;

    let checked = false;
    if(_has(props, 'checked')) {
      checked = props.checked;
    } else {
      checked = props.defaultChecked;
    }
    this.state = { checked };
  }

  componentWillReceiveProps(nextProps) {
    if(_has(nextProps, 'checked')) {
      this.setState({
        checked: nextProps.checked
      });
    }
  }

  handleToggle() {
    const {onClick} = this.props;
    const checked = !this.state.checked;
    this.setChecked(checked);
    onClick(checked);
  }

  setChecked(checked) {
    const {disabled, onChange} = this.props;
    if(disabled) return;

    // 如果checked不通过props向下传递，checked根据this.state
    // 否则交由componentWillReceiveProps处理
    if(!_has(this.props, 'checked')) {
      this.setState({checked});
    }
    onChange(checked);
  }

  render() {
    const {
      className,
      disabled,
      type,
      ...restProps
    } = this.props;
    const checked = this.state.checked;
    const switchCls = cx('nf-switch', className);

    return (
      <div
        {...restProps}
        className={switchCls}
        onClick={this.handleToggle}
      >
        <style>
          {
            `
              .nf-switch-checkbox:checked ~ .nf-switch-helper:after {
                background-color: ${Switch.colorMap[type]}
              }
            `
          }
        </style>
        <input
          type="checkbox"
          checked={checked}
          className="nf-switch-checkbox"
          disabled={disabled}
        />
        <i className="nf-switch-helper" />
      </div>
    );
  }
}

export default Switch;