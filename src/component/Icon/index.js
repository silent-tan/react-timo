/**
 * @Author: farzer
 * @Date:   2017-08-03 15:10:35
 * @Last modified by:   farzer
 * @Last modified time: 2017-08-17 16:24:25
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    rest: PropTypes.any
  }
  static defaultProps = {
    style: {},
    className: ''
  }
  constructor(props) {
    super(props);
  }

  render() {
    const {
      type,
      style,
      className,
      rest
    } = this.props;
    return (
      <i
        className={`zmdi zmdi-${type} ${className}`}
        style={style}
        {...rest}
      />
    );
  }

}

export default Icon;