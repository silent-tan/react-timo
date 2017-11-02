import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import _noop from 'lodash/noop';
import _forEach from 'lodash/forEach';
import _isNil from 'lodash/isNil';

import Radio from './Radio';

class RadioGroup extends Component {
  static propTypes = {
    /**
     * Radios的配置
     */
    options: PropTypes.array.isRequired,
    /**
     * 额外类名
     */
    className: PropTypes.string,
    /**
     * 额外样式
     */
    style: PropTypes.object,
    /**
     * 是否保持一行
     */
    inline: PropTypes.bool,
    /**
     * 勾选的值
     */
    value: PropTypes.any,
    /**
     * 发生改变回调
     */
    onChange: PropTypes.func,
    /**
     * 所有Radio的name
     */
    name: PropTypes.string,
    /**
     * 禁止点击
     */
    disabled: PropTypes.bool
  }

  static defaultProps = {
    className: '',
    style: {},
    inline: true,
    value: undefined,
    onChange: _noop,
    disabled: false,
    name: uuid.v1()
  }

  constructor(props) {
    super(props);
    this.renderRadios = ::this.renderRadios;
    this.handleChange = ::this.handleChange;
  }

  handleChange(value) {
    const {onChange} = this.props;
    onChange(value);
  }

  renderRadios() {
    const {options, disabled, value, inline, name} = this.props;
    const radios = [];
    _forEach(options, (opt, index) => {
      let disabledTemp = disabled;
      if(!_isNil(opt.disabled)) disabledTemp = opt.disabled;
      radios.push(
        <Radio
          key={opt.value}
          checked={opt.value === value}
          value={opt.value}
          disabled={disabledTemp}
          name={name}
          onClick={this.handleChange}
        >{ opt.label }</Radio>
      );
      if(!inline && (index !== options.length - 1)) {
        radios.push(
          <div className="clearfix mb-2" key={`clearfix${opt.value}`}/>
        );
      }
    });
    return radios;
  }

  render() {
    const {className, style} = this.props;
    return (
      <div className={className} style={style}>
        {this.renderRadios()}
      </div>
    );
  }
}

export default RadioGroup;