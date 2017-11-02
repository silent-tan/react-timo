/**
 * @Author: farzer
 * @Date:   2017-08-21 09:47:21
 * @Last modified by:   farzer
 * @Last modified time: 2017-08-21 10:05:04
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import _noop from 'lodash/noop';
import _forEach from 'lodash/forEach';
import _includes from 'lodash/includes';
import _pull from 'lodash/pull';
import _isNil from 'lodash/isNil';

import Checkbox from './Checkbox';

/**
 * 多选框组
 * @type {Component}
 * className 类名样式
 * options [{label: 'xx', value: xx}, ...]  配置选项
 * value  [value1, value2]  勾选的值
 * onChange 状态改变回调
 */
class CheckboxGroup extends Component {
  static propTypes = {
    /**
     * 全禁止勾选
     */
    disabled: PropTypes.bool,
    /**
     * 额外类名
     */
    className: PropTypes.string,
    /**
     * 额外样式
     */
    style: PropTypes.object,
    /**
     * checkbox配置
     */
    options: PropTypes.array.isRequired,
    /**
     * 选中的值
     */
    values: PropTypes.array,
    /**
     * checkbox改变的回调
     */
    onChange: PropTypes.func,
    /**
     * checkbox组别统一的name
     */
    name: PropTypes.string,
    /**
     * 是否同一行
     */
    inline: PropTypes.bool
  }

  static defaultProps = {
    disabled: false,
    className: '',
    style: {},
    values: [],
    onChange: _noop,
    name: uuid.v1(),
    inline: true
  }

  constructor(props) {
    super(props);
    this.handleChange = ::this.handleChange;
    this.renderCheckboxes = ::this.renderCheckboxes;
  }

  handleChange(checked, value) {
    const {onChange, values: originalValue} = this.props;
    const values = [...originalValue];
    if(checked) {
      values.push(value);
    } else {
      _pull(values, value);
    }

    onChange(values);
  }

  renderCheckboxes() {
    const {options, values, name, disabled, inline} = this.props;
    const checkboxes = [];
    _forEach(options, (opt, index) => {
      let disabledTemp = disabled;
      if(!_isNil(opt.disabled)) {
        disabledTemp = opt.disabled;
      }
      checkboxes.push(
        <Checkbox
          key={opt.value}
          value={opt.value}
          checked={_includes(values, opt.value)}
          name={name}
          disabled={disabledTemp}
          onChange={this.handleChange}
        >{opt.label}</Checkbox>
      );
      if(!inline && (index !== options.length - 1)) {
        checkboxes.push(
          <div className="clearfix mb-2" key={`clearfix${opt.value}`}/>
        );
      }
    });
    return checkboxes;
  }

  render() {
    const {className, style} = this.props;
    return (
      <div className={className} style={style}>
        { this.renderCheckboxes() }
      </div>
    );
  }
}

export default CheckboxGroup;