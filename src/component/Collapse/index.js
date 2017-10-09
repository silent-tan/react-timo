import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import CollapsePanel from './Panel';
import animation from './openAnimation';
import classNames from 'classnames';
import _isArray from 'lodash/isArray';
import _includes from 'lodash/includes';
import _indexOf from 'lodash/indexOf';
import _noop from 'lodash/noop';
import _has from 'lodash/has';
import _cloneDeep from 'lodash/cloneDeep';

import './_collapse.scss';

function toArray(activeKey) {
  let currentActiveKey = _cloneDeep(activeKey);
  if (!_isArray(currentActiveKey)) {
    currentActiveKey = currentActiveKey ? [currentActiveKey] : [];
  }
  return currentActiveKey;
}

class Collapse extends Component {
  static Panel = CollapsePanel
  static propTypes = {
    /**
     * 单一模式,如果为true,则手风琴可以同时打开
     */
    accordion: PropTypes.bool,
    /**
     * 激活状态的item, 可以同时激活多个
     */
    activeKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    /**
     * 手风琴主题，边框状态是否开启
     */
    bordered: PropTypes.bool,
    /**
     * 手风琴子组件，指的是Panel子组件
     */
    children: PropTypes.any,
    /**
     * 手风琴最外层extra类名
     */
    className: PropTypes.string,
    /**
     * 加载手风琴后默认打开的样式, 同样可以同时默认打开多个
     */
    defaultActiveKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    /**
     * 是否删除未激活的Item
     */
    destroyInactivePanel: PropTypes.bool,
    /**
     * Item改变的回调事件
     */
    onChange: PropTypes.func,
    /**
     * Item打开关闭动画
     */
    openAnimation: PropTypes.object,
    /**
     * 组件类名前缀
     */
    prefixCls: PropTypes.string,
    /**
     * Item 标题是否显示上下箭头
     */
    showArrow: PropTypes.bool,
    /**
     * 手风琴的内联样式
     */
    style: PropTypes.object
  }

  static defaultProps = {
    prefixCls: 'nf-collapse',
    onChange: _noop,
    accordion: false,
    bordered: false,
    showArrow: false,
    destroyInactivePanel: false,
    openAnimation: { ...animation, appear: _noop }
  }

  constructor(props) {
    super(props);

    const { activeKey, defaultActiveKey } = this.props;
    let currentActiveKey = defaultActiveKey;
    if (_has(this.props, 'activeKey')) { currentActiveKey = activeKey; }

    this.state = {
      openAnimation: this.props.openAnimation,
      activeKey: toArray(currentActiveKey)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (_has(nextProps, 'activeKey')) {
      this.setState({
        activeKey: toArray(nextProps.activeKey)
      });
    }
    if (_has(nextProps, 'openAnimation')) {
      this.setState({
        openAnimation: nextProps.openAnimation
      });
    }
  }

  onClickItem(key) {
    let activeKey = this.state.activeKey;
    if (this.props.accordion) {
      activeKey = activeKey[0] === key ? [] : [key];
    } else {
      activeKey = [...activeKey];
      const index = _indexOf(activeKey, key);
      const isActive = index > -1;
      if (isActive) {
        // remove active state
        activeKey.splice(index, 1);
      } else {
        activeKey.push(key);
      }
    }
    this.setActiveKey(activeKey);
  }

  getItems() {
    const activeKey = this.state.activeKey;
    const { prefixCls, accordion, destroyInactivePanel, showArrow } = this.props;
    const newChildren = [];

    // React Children Method
    Children.forEach(this.props.children, (child, index) => { // eslint-disable-line
      if (!child) return;
      // If there is no key provide, use the panel order as default key
      const key = child.key || index + '';
      const { header, headerClass, disabled } = child.props;
      let isActive = false;
      if (accordion) {
        isActive = activeKey[0] === key;
      } else {
        isActive = _includes(activeKey, key);
      }

      const props = {
        key,
        header,
        headerClass,
        isActive,
        prefixCls,
        showArrow,
        destroyInactivePanel,
        openAnimation: this.state.openAnimation,
        children: child.props.children,
        onItemClick: disabled ? null : () => this.onClickItem(key)
      };

      newChildren.push(React.cloneElement(child, props));
    });

    return newChildren;
  }

  setActiveKey(activeKey) {
    if (!_has(this.props, 'activeKey')) {
      this.setState({ activeKey });
    }
    this.props.onChange(this.props.accordion ? activeKey[0] : activeKey);
  }

  render() {
    const { prefixCls, className = '', bordered, style } = this.props;
    const collapseClassName = classNames({
      [`${prefixCls}-borderless`]: !bordered,
      [prefixCls]: true,
      [className]: !!className
    }, className);

    return (
      <div className={collapseClassName} style={style}>
        {this.getItems()}
      </div>
    );
  }
}

export default Collapse;