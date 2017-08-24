/**
 * @Author: farzer
 * @Date:   2017-08-24 09:49:27
 * @Last modified by:   farzer
 * @Last modified time: 2017-08-24 10:32:40
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import _noop from 'lodash/noop';
import _has from 'lodash/has';

import './_style.scss';

class Switch extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    checkedChildren: PropTypes.any,
    className: PropTypes.string,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    uncheckedChildren: PropTypes.any
  }

  static defaultProps = {
    checkedChildren: null,
    uncheckedChildren: null,
    className: '',
    defaultChecked: false,
    onChange: _noop,
    onClick: _noop
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
      checkedChildren,
      uncheckedChildren,
      className,
      disabled,
      ...restProps
    } = this.props;
    const checked = this.state.checked;
    const switchCls = cx('nf-switch', className, {
      'nf-switch-checked': checked,
      'nf-switch-disabled': disabled
    });

    return (
      <span
        {...restProps}
        className={switchCls}
        onClick={this.handleToggle}
      >
        <span className="nf-switch-inner">
          {checked ? checkedChildren : uncheckedChildren}
        </span>
      </span>
    );
  }
}

export default Switch;