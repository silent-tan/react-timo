/**
 * @Author: farzer
 * @Date:   2017-06-28 11:32:59
 * @Last modified by:   farzer
 * @Last modified time: 2017-08-17 16:16:55
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _noop from 'lodash/noop';
import _isString from 'lodash/isString';
import _isNumber from 'lodash/isNumber';
import _join from 'lodash/join';
import _split from 'lodash/split';
import Waves from '../Waves';
import Icon from '../Icon';

Waves.init();
Waves.attach('.btn');

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);

const MODE = ['primary', 'secondary', 'success', 'info', 'danger', 'warning', 'link'];

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
    /**
     * 类名
     */
    className: PropTypes.string,
    /**
     * 按钮场景
     */
    mode: PropTypes.oneOf(MODE),
    /**
     * 按钮边框化
     */
    outline: PropTypes.bool,
    /**
     * 点击回调事件
     */
    onClick: PropTypes.func,
    /**
     * 鼠标聚焦事件回调
     */
    onFocus: PropTypes.func,
    /**
     * 禁止点击
     */
    disabled: PropTypes.bool,
    /**
     * children
     */
    children: PropTypes.node,
    /**
     * 两个汉字插入空格
     */
    insertSpace: PropTypes.bool,
    /**
     * Icon式按钮, 取值为Icon组件的type
     */
    icon: PropTypes.string,
    /**
     * 点击后加载状态
     */
    loading: PropTypes.bool
  }

  static defaultProps = {
    className: '',
    disabled: false,
    onClick: _noop,
    icon: '',
    onFocus: _noop,
    mode: 'secondary',
    outline: false,
    insertSpace: true,
    loading: false
  }

  constructor(props) {
    super(props);
    this.renderChild = ::this.renderChild;
  }

  // 如果是两个中文字符，则自动插入一个空格
  renderChild(child) {
    const {icon} = this.props;
    if (child == null) {
      if(icon !== '') {
        return (
          <Icon type={icon}/>
        );
      }
      return null;
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
      mode,
      icon,
      outline,
      ...rest
    } = this.props;

    const cls = cx('btn waves-effect', {
      [`btn-${outline && mode !== 'link' ? 'outline-' +  mode : mode }`]: true,
      'btn--icon': icon !== ''
    }, className);
    const extraAttr = {disabled: disabled};
    if(loading) extraAttr.disabled = true;
    return (
      <button className={cls} {...rest} {...extraAttr}>
        { this.renderChild(children) }
      </button>
    );
  }
}

export default Button;
