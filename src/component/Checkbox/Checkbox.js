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
    checked: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf([undefined])
    ]),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.oneOf([undefined])
    ]),
    name: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    showText: PropTypes.string,
    disabled: PropTypes.bool
  }
  static defaultProps = {
    checked: undefined,
    value: undefined,
    className: '',
    onChange: noop,
    showText: '',
    onClick: noop,
    disabled: false,
    name: uuid.v1()
  }
  constructor(props) {
    super(props);
    this.handleChange = ::this.handleChange;
    this.handleClick = ::this.handleClick;
  }
  handleClick(e) {
    const {onClick, value: originalValue} = this.props;
    const value = this.processingValue(e.target.value, originalValue);
    const checked = e.target.checked;
    onClick(checked, value);
  }
  handleChange(e) {
    const {onChange, value: originalValue} = this.props;
    const value = this.processingValue(e.target.value, originalValue);
    const checked = e.target.checked;
    onChange(checked, value);
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
    const {checked, value, name, className, showText, disabled} = this.props;
    const rest = {};
    if(!isNil(checked)) {rest.checked = checked;}
    if(!isNil(value)) {rest.value = value;}
    return (
      <label className={`custom-control custom-checkbox ${className} ${disabled ? 'disabled': ''}`}>
        <input
          type="checkbox"
          className="custom-control-input"
          name={name}
          onChange={this.handleChange}
          onClick={this.handleClick}
          disabled={disabled}
          {...rest}
        />
        <span className="custom-control-indicator"/>
        {
          showText !== '' ? <span className="custom-control-description">{showText}</span> : null
        }
      </label>
    );
  }
}

Checkbox.Group = Group;

export default Checkbox;