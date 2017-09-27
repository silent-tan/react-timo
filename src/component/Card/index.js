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
    /**
     * React Component
     */
    children: PropTypes.any.isRequired,
    /**
     * 动画名称, 参照css-animate动画名称
     */
    animated: PropTypes.string,
    /**
     * 边框主题
     */
    outline: PropTypes.oneOf(STATUS),
    /**
     * 内敛样式
     */
    style: PropTypes.object,
    /**
     * 标题
     */
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]),
    /**
     * 标题描述
     */
    desc: PropTypes.node,
    /**
     * 主题
     */
    type: PropTypes.oneOf(STATUS)
  }
  static defaultProps = {
    animated: '',
    outline: 'default',
    style: {},
    title: '',
    type: 'default'
  }
  constructor(props) {
    super(props);
    this.renderHeader = ::this.renderHeader;
  }
  renderHeader() {
    const {title, desc} = this.props;
    if(title) {
      let titleTemp = null;
      let descTemp = null;
      if(_isString) {
        titleTemp = (
          <h2 className="card-title">{title}</h2>
        );
      } else {
        titleTemp = title;
      }
      if(desc) {
        descTemp = (
          <small className="card-subtitle">
            {desc}
          </small>
        );
      }
      return (
        <div className="card-header">
          {titleTemp}
          {descTemp}
        </div>
      );
    }
    return null;
  }
  render() {
    const {children, animated, style, type, outline} = this.props;
    const cls = cx('card', {
      [`animated ${animated}`]: animated !== '',
      [`card-${type}`]: type !== 'default',
      'card-inverse': type !== 'default',
      [`card-outline-${outline}`]: outline !== 'default'
    });

    const blockCls = cx('card-block', {
      'card-text': type !== 'default'
    });
    return (
      <div className={cls} style={style}>
        { this.renderHeader() }
        <div className={blockCls}>
          {children}
        </div>
      </div>
    );
  }
}

export default Card;