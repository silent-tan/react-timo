/**
 * @Author: farzer
 * @Date:   2017-08-03 15:10:35
 * @Last modified by:   farzer
 * @Last modified time: 2017-09-08 09:47:20
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
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
    /**
     * Icon 类型
     */
    type: PropTypes.string.isRequired,
    /**
     * Icon组件额外的内联样式
     */
    style: PropTypes.object,
    /**
     * Icon 自动对齐 .zmdi-hc-fw
     */
    autoFixed: PropTypes.bool,
    /**
     * Icon组件额外的类名
     */
    className: PropTypes.string,
    /**
     * Icon组件触发点击事件回调函数
     */
    onClick: PropTypes.func
  }
  static defaultProps = {
    style: {},
    className: '',
    autoFixed: false,
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
      autoFixed,
      ...rest
    } = this.props;
    const cls = cx('zmdi', `zmdi-${type}`, {
      'zmdi-hc-fw': autoFixed
    }, className);
    return (
      <i
        className={cls}
        style={style}
        onClick={this.handleClick}
        {..._omit(rest, ['onClick'])}
      />
    );
  }

}

export default Icon;