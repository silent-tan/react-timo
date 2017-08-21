import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import _noop from 'lodash/noop';
import _forEach from 'lodash/forEach';
import _isNil from 'lodash/isNil';

import Radio from './Radio';

class RadioGroup extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    inline: PropTypes.bool,
    value: PropTypes.any,
    onChange: PropTypes.func,
    name: PropTypes.string,
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
          showText={opt.label}
          disabled={disabledTemp}
          name={name}
          onClick={this.handleChange}
        />
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