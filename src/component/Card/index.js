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
import './_card.scss';

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
    desc: PropTypes.node,
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
          <div className="nf-card-header-desc">
            {desc}
          </div>
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
    return (
      <div className={cls} style={style}>
        { this.renderHeader() }
        <div className="card-block">
          {children}
        </div>
      </div>
    );
  }
}

export default Card;