import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _noop from 'lodash/noop';
import _omit from 'lodash/omit';

class CheckableTag extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func
  }

  static defaultProps = {
    prefixCls: 'nf-tag',
    className: '',
    checked: false,
    onChange: _noop
  }
  constructor(props) {
    super(props);
    this.handleClick = ::this.handleClick;
  }

  handleClick() {
    const { checked, onChange } = this.props;
    if (onChange) {
      onChange(!checked);
    }
  }
  render() {
    const { prefixCls, className, checked, ...restProps } = this.props;
    const cls = cx(prefixCls, {
      [`${prefixCls}-checkable`]: true,
      [`${prefixCls}-checkable-checked`]: checked
    }, className);

    return <div {..._omit(restProps, ['onChange'])} className={cls} onClick={this.handleClick} />;
  }
}

export default CheckableTag;