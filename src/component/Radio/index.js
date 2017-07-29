/**
 * @Author: farzer
 * @Date:   2017-07-14 19:52:09
 * @Last modified by:   farzer
 * @Last modified time: 2017-07-14 20:15:20
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import isNil from 'lodash/isNil';

class Radio extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
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
    disabled: false
  }
  constructor(props) {
    super(props);
    this.handleChange = ::this.handleChange;
    this.handleClick = ::this.handleClick;
  }
  handleClick(e) {
    const {onClick, value: originalValue} = this.props;
    const value = this.processingValue(e.target.value, originalValue);
    onClick(value);
  }
  handleChange(e) {
    const {onChange, value: originalValue} = this.props;
    const value = this.processingValue(e.target.value, originalValue);
    onChange(value);
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
      <label className={`custom-control custom-radio ${className}`}>
        <input
          type="radio"
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

export default Radio;
