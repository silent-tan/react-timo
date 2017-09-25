/**
 * @Author: farzer
 * @Date:   2017-08-03 15:10:35
 * @Last modified by:   farzer
 * @Last modified time: 2017-09-08 09:47:20
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _noop from 'lodash/noop';
import _omit from 'lodash/omit';

/**
 * 图标
 * @type {Component}
 * type: 图标
 * style: 样式
 * className: 类名
 *
 * type 取值见 http://byrushan.com/projects/material-admin/app/2.0/jquery/bs4/icons.html
 */

class Icon extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    onClick: PropTypes.func
  }
  static defaultProps = {
    style: {},
    className: '',
    onClick: _noop
  }
  constructor(props) {
    super(props);
    this.handleClick = ::this.handleClick;
  }

  handleClick(e) {
    const {onClick} = this.props;
    onClick(e);
  }

  render() {
    const {
      type,
      style,
      className,
      ...rest
    } = this.props;
    return (
      <i
        className={`zmdi zmdi-${type} ${className}`}
        style={style}
        onClick={this.handleClick}
        {..._omit(rest, ['onClick'])}
      />
    );
  }

}

export default Icon;