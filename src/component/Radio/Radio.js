/**
 * @Author: farzer
 * @Date:   2017-07-14 19:52:09
 * @Last modified by:   farzer
 * @Last modified time: 2017-07-14 20:15:20
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import _noop from 'lodash/noop';
import _isNil from 'lodash/isNil';

/**
 * 单选组件
 * @type {Component}
 * name 唯一标志值
 * checked 是否选中
 * value  radio的值
 * className 类名样式
 * children 显示的文本
 * disabled 禁用
 * onChange 回调
 */
class Radio extends Component {
  static propTypes = {
    /**
     * Radio name
     */
    name: PropTypes.string,
    /**
     * 受控勾选
     */
    checked: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf([undefined])
    ]),
    /**
     * 非受控勾选
     */
    defaultChecked: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf([undefined])
    ]),
    /**
     * Radio value
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.oneOf([undefined])
    ]),
    /**
     * 额外类名
     */
    className: PropTypes.string,
    /**
     * 额外样式
     */
    style: PropTypes.object,
    /**
     * Radio改变回调
     */
    onChange: PropTypes.func,
    /**
     * Radio点击回调
     */
    onClick: PropTypes.func,
    /**
     * label
     */
    children: PropTypes.node,
    /**
     * 禁止勾选点击
     */
    disabled: PropTypes.bool
  }
  static defaultProps = {
    checked: undefined,
    value: undefined,
    defaultChecked: undefined,
    className: '',
    style: {},
    onChange: _noop,
    onClick: _noop,
    disabled: false
  }
  constructor(props) {
    super(props);
    this.handleChange = ::this.handleChange;
    this.handleClick = ::this.handleClick;
    this.state = {
      name: uuid.v1()
    };
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps !== undefined && nextProps !== this.props.name) {
      this.setState({
        name: nextProps.name
      });
    }
  }
  handleClick(e) {
    const {onClick, value: originalValue} = this.props;
    const value = this.processingValue(e.target.value, originalValue);
    onClick(value, e);
  }
  handleChange(e) {
    const {onChange, value: originalValue} = this.props;
    const value = this.processingValue(e.target.value, originalValue);
    onChange(value, e);
  }
  processingValue(valueTemp, originalValue) {
    let value = valueTemp;
    switch (typeof originalValue) {
      case 'boolean':
        value = Boolean(value);
        break;
      case 'number':
        value = +value;
        break;
      default:
    }
    return value;
  }
  render() {
    const { checked, value, className, children, disabled, style, defaultChecked } = this.props;
    const rest = {};
    if(!_isNil(checked)) {rest.checked = checked;}
    if(!_isNil(value)) {rest.value = value;}
    if(!_isNil(defaultChecked) && checked === undefined) { rest.defaultChecked = defaultChecked; }
    return (
      <label className={`custom-control custom-radio ${className} ${disabled ? 'disabled': ''}`} style={style}>
        <input
          type="radio"
          className="custom-control-input"
          name={this.state.name}
          onChange={this.handleChange}
          onClick={this.handleClick}
          disabled={disabled}
          {...rest}
        />
        <span className="custom-control-indicator"/>
        <span className="custom-control-description">{children}</span>
      </label>
    );
  }
}

export default Radio;
