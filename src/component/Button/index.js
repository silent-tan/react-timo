/**
 * @Author: farzer
 * @Date:   2017-06-28 11:32:59
 * @Last modified by:   farzer
 * @Last modified time: 2017-08-17 16:16:55
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import cx from 'classnames';
import _isString from 'lodash/isString';
import _isNumber from 'lodash/isNumber';
import _join from 'lodash/join';
import _split from 'lodash/split';
import Waves from '../Waves';

Waves.init();
Waves.attach('.btn');

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);

/**
 * 按钮
 * @type {Component}
 * className 类名
 * onClick  点击事件
 * onFocus  聚焦事件
 * disabled 不可点击
 * insertSpace  两个汉字间是否插入空格
 * loading  不可点击状态，用于避免多次提交
 */
class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    disabled: PropTypes.bool,
    children: PropTypes.any,
    insertSpace: PropTypes.bool,
    loading: PropTypes.bool
  }

  static defaultProps = {
    className: 'btn-secondary',
    disabled: false,
    onClick: noop,
    onFocus: noop,
    insertSpace: true,
    loading: false
  }

  constructor(props) {
    super(props);
    this.handleInsertSpace = ::this.handleInsertSpace;
  }

  // 如果是两个中文字符，则自动插入一个空格
  handleInsertSpace(child) {
    if (child == null) {
      return;
    }
    const SPACE = ' ';
    if (!_isString(child) && _isNumber(child) && _isString(child.type) && isTwoCNChar(child.props.children)) {
      const childChanged = _join(_split(child.props.children, ''), SPACE);
      return React.cloneElement(child, {}, childChanged);
    }
    if (_isString(child)) {
      if (isTwoCNChar(child)) {
        child = _join(_split(child, ''), SPACE);
      }
      return <span>{child}</span>;
    }
    return child;
  }

  render() {
    const {
      children,
      className,
      insertSpace,  // eslint-disable-line
      disabled,
      loading,
      ...rest
    } = this.props;

    const cls = cx('btn waves-effect', className);
    const extraAttr = {disabled: disabled};
    if(loading) extraAttr.disabled = true;
    return (
      <button className={cls} {...rest} {...extraAttr}>
        { this.handleInsertSpace(children) }
      </button>
    );
  }
}

export default Button;
