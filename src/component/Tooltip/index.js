import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import RcTooltip from 'rc-tooltip';
import cx from 'classnames';

import _noop from 'lodash/noop';
import _has from 'lodash/has';
import _pick from 'lodash/pick';
import _omit from 'lodash/omit';
import _find from 'lodash/find';
import _keys from 'lodash/keys';
import _includes from 'lodash/includes';

import getPlacements from './placements';
import './_style.scss';

const PLACEMENT = [
  'top',
  'left',
  'right',
  'bottom',
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
  'leftTop',
  'leftBottom',
  'rightTop',
  'rightBottom'
];

const defaultGetPopupContainer = () => window.document.body;

/**
 * 提示工具
 * @type {Component}
 * content 提示内容，尽可能提供字符串内容 √
 * placement 提示方向 PLACEMENT √
 * trigger  触发事件  √
 * visible 工具可见化  √
 * onVisibleChange  发生改变的回调
 * getPopupContainer 提示组件挂载位置 ×
 * arrowPointAtCenter 箭头指向内容中心  ×
 * mouseEnterDelay  hover时延迟多少秒触发 ×
 * mouseLeaveDelay  hover鼠标离开延迟多少秒触发  ×
 * overlayClassName 包含的内容额外类名 ×
 * overlayStyle   包含的内容额外样式 ×
 * transitionName 动画  ×
 * prefixCls 方便UI框架内复用该组件的类名前缀 ×
 */
class Tooltip extends Component {
  static propTypes = {
    content: PropTypes.any.isRequired,
    placement: PropTypes.oneOf(PLACEMENT),
    getPopupContainer: PropTypes.func,
    arrowPointAtCenter: PropTypes.bool,
    autoAdjustOverflow: PropTypes.bool,
    visible: PropTypes.bool,
    onVisibleChange: PropTypes.func,
    mouseEnterDelay: PropTypes.number,
    mouseLeaveDelay: PropTypes.number,
    trigger: PropTypes.oneOf(['click', 'hover', 'focus']),
    overlayClassName: PropTypes.string,
    overlayStyle: PropTypes.object,
    transitionName: PropTypes.string,
    children: PropTypes.any,
    prefixCls: PropTypes.string
  }

  static defaultProps = {
    placement: 'top',
    getPopupContainer: defaultGetPopupContainer,
    arrowPointAtCenter: false,
    autoAdjustOverflow: true,
    onVisibleChange: _noop,
    mouseEnterDelay: 0,
    mouseLeaveDelay: .1,
    trigger: 'hover',
    overlayClassName: '',
    overlayStyle: {},
    transitionName: 'zoom-big-fast',
    prefixCls: 'nf-tooltip'
  }
  constructor(props) {
    super(props);
    this.isNoContent = ::this.isNoContent;
    this.handleVisibleChange = ::this.handleVisibleChange;
    this.state = {
      visible: props.visible
    };
  }

  componentWillReceiveProps(nextProps) {
    if (_has(nextProps, 'visible')) {
      this.setState({ visible: nextProps.visible });
    }
  }

  handleVisibleChange(visible) {
    const { onVisibleChange } = this.props;
    if (!_has(this.props, 'visible')) {
      this.setState({ visible: this.isNoContent() ? false : visible });
    }
    if (onVisibleChange && !this.isNoContent()) {
      onVisibleChange(visible);
    }
  }

  getPopupDomNode() {
    return this.refsTooltip.getPopupDomNode();
  }

  getPlacements() {
    const { arrowPointAtCenter, autoAdjustOverflow } = this.props;
    return getPlacements({
      arrowPointAtCenter,
      verticalArrowShift: 8,
      autoAdjustOverflow
    });
  }

  isHoverTrigger() {
    const { trigger } = this.props;
    if (!trigger || trigger === 'hover') {
      return true;
    }
    return false;
  }

  // Fix Tooltip won't hide at disabled button
  // mouse events don't trigger at disabled button in Chrome
  // https://github.com/react-component/tooltip/issues/18
  getDisabledCompatibleChildren(element) {
    if ((element.type.__ANT_BUTTON || element.type === 'button') &&
        element.props.disabled && this.isHoverTrigger()) {
      // Pick some layout related style properties up to span
      // Prevent layout bugs like https://github.com/ant-design/ant-design/issues/5254
      const placementAttr = ['position', 'left', 'right', 'top', 'bottom', 'float', 'display', 'zIndex'];
      const picked = _pick(element.props.style, placementAttr);
      const omited = _omit(element.props.style, placementAttr);

      const spanStyle = {
        display: 'inline-block',  // default inline-block is important
        ...picked,
        cursor: 'not-allowed'
      };
      const buttonStyle = { ...omited, pointerEvents: 'none' };
      const child = cloneElement(element, { style: buttonStyle, className: null });
      return (
        <span style={spanStyle} className={element.props.className}>
          {child}
        </span>
      );
    }
    return element;
  }

  isNoContent() {
    const { content } = this.props;
    return !content;
  }

  // 动态设置动画点
  onPopupAlign = (domNode, align) => {
    const placements = this.getPlacements();
    // 当前返回的位置
    const placement = _find(_keys(placements), key => {
      return placements[key].points[0] === align.points[0] && placements[key].points[1] === align.points[1];
    });

    if (!placement) {
      return;
    }
    // 根据当前坐标设置动画点
    const rect = domNode.getBoundingClientRect();
    const transformOrigin = {
      top: '50%',
      left: '50%'
    };
    if (_includes(placement, 'top') || _includes(placement, 'Bottom')) {
      transformOrigin.top = `${rect.height - align.offset[1]}px`;
    } else if (_includes(placement, 'Top') || _includes(placement, 'bottom')) {
      transformOrigin.top = `${-align.offset[1]}px`;
    }
    if (_includes(placement, 'left') || _includes(placement, 'Right')) {
      transformOrigin.left = `${rect.width - align.offset[0]}px`;
    } else if (_includes(placement, 'right') || _includes(placement, 'Left')) {
      transformOrigin.left = `${-align.offset[0]}px`;
    }
    domNode.style.transformOrigin = `${transformOrigin.left} ${transformOrigin.top}`;
  }

  render() {
    const {
      content,
      overlayClassName,
      getPopupContainer,
      prefixCls,
      children
    } = this.props;
    let visible = this.state.visible;
    // Hide tooltip when there is no content
    if (!_has(this.props, 'visible') && this.isNoContent()) {
      visible = false;
    }

    const child = this.getDisabledCompatibleChildren(
      React.isValidElement(children) ? children : <span>{children}</span>,
    );
    const childProps = child.props;
    const childCls = cx(childProps.className, {
      [overlayClassName || `${prefixCls}-overlay`]: true
    });

    return (
      <RcTooltip
        {...this.props}
        prefixCls={prefixCls}
        getTooltipContainer={getPopupContainer}
        ref={refsNode => this.refsTooltip = refsNode}
        builtinPlacements={this.getPlacements()}
        overlay={content || ''}
        visible={visible}
        onVisibleChange={this.handleVisibleChange}
        onPopupAlign={this.onPopupAlign}
      >
        {visible ? cloneElement(child, { className: childCls }) : child}
      </RcTooltip>
    );
  }
}

export default Tooltip;