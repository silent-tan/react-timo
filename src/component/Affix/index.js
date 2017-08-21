/**
 * @Author: farzer
 * @Date:   2017-08-17 16:44:17
 * @Last modified by:   farzer
 * @Last modified time: 2017-08-17 16:47:39
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _omit from 'lodash/omit';

/**
 * 固钉
 * @type {Component}
 * offsetTop 滚动到距离顶部触发固定
 * offsetBottom 滚动到距离底部触发固定
 */
class Affix extends Component {
  static propTypes = {
    offsetTop: PropTypes.number,
    offsetBottom: PropTypes.number,
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.any
  }

  static defaultProps = {
    style: {},
    className: ''
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {className, style, children} = this.props;
    const wrapStyle = {
      position: 'fixed',
      ...style
    };
    const props = _omit(this.props, 'offsetTop', 'offsetBottom', 'style', 'className');
    return (
      <div className={className} {...props} style={wrapStyle}>
        {children}
      </div>
    );
  }
}

export default Affix;