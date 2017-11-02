/**
 * @Author: farzer
 * @Date:   2017-07-14 19:52:09
 * @Last modified by:   farzer
 * @Last modified time: 2017-07-14 20:15:30
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import noop from 'lodash/noop';
import isNil from 'lodash/isNil';
import Group from './Group';

class Checkbox extends Component {
  static propTypes = {
    /**
     * 是否勾选
     */
    checked: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf([undefined])
    ]),
    /**
     * 默认勾选
     */
    defaultChecked: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf([undefined])
    ]),
    /**
     * 值
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.oneOf([undefined])
    ]),
    /**
     * checkbox name
     */
    name: PropTypes.string,
    /**
     * 额外类名
     */
    className: PropTypes.string,
    /**
     * 发生改变的回调
     */
    onChange: PropTypes.func,
    /**
     * 点击回调
     */
    onClick: PropTypes.func,
    /**
     * 要展示的label
     */
    children: PropTypes.node,
    /**
     * 是否可以点击
     */
    disabled: PropTypes.bool
  }
  static defaultProps = {
    checked: undefined,
    value: undefined,
    className: '',
    onChange: noop,
    onClick: noop,
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
    const checked = e.target.checked;
    onClick(checked, value, e);
  }
  handleChange(e) {
    const {onChange, value: originalValue} = this.props;
    const value = this.processingValue(e.target.value, originalValue);
    const checked = e.target.checked;
    onChange(checked, value, e);
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
    const { checked, value, className, children, disabled, defaultChecked } = this.props;
    const rest = {};
    if(!isNil(checked)) { rest.checked = checked; }
    if(!isNil(value)) { rest.value = value; }
    if(!isNil(defaultChecked) && checked === undefined) { rest.defaultChecked = defaultChecked; }
    return (
      <label className={`custom-control custom-checkbox ${className} ${disabled ? 'disabled': ''}`}>
        <input
          type="checkbox"
          className="custom-control-input"
          name={this.state.name}
          onChange={this.handleChange}
          onClick={this.handleClick}
          disabled={disabled}
          {...rest}
        />
        <span className="custom-control-indicator"/>
        <span className="custom-control-description">{ children }</span>
      </label>
    );
  }
}

Checkbox.Group = Group;

export default Checkbox;