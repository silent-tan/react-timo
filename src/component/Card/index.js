/**
 * @Author: farzer
 * @Date:   2017-07-29 16:47:04
 * @Last modified by:   farzer
 * @Last modified time: 2017-08-21 14:25:28
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _isString from 'lodash/isString';

const STATUS = ['default', 'info', 'primary', 'success', 'warning', 'danger'];

/**
 * 卡片组件
 * @type {Component}
 * animated css动画
 * outline  卡片边框
 * title  卡片标题
 * type 卡片类型：底色
 */
class Card extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    animated: PropTypes.string,
    outline: PropTypes.oneOf(STATUS),
    style: PropTypes.object,
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    type: PropTypes.oneOf(STATUS)
  }
  static defaultProps = {
    animated: '',
    outline: 'default',
    style: {},
    title: '',
    type: 'default'
  }
  render() {
    const {title, children, animated, style, type, outline} = this.props;
    const cls = cx('card', {
      [`animated ${animated}`]: animated !== '',
      [`card-${type}`]: type !== 'default',
      'card-inverse': type !== 'default',
      [`card-outline-${outline}`]: outline !== 'default'
    });
    return (
      <div className={cls} style={style}>
        {
          title ?
            <div className="card-header">
              {
                _isString(title) ? <h2 className="card-title">{title}</h2> : {title}
              }
            </div> : null
        }
        <div className="card-block">
          {children}
        </div>
      </div>
    );
  }
}

export default Card;