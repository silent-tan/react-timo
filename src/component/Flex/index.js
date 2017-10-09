import './_style.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _assign from 'lodash/assign';
import _isBoolean from 'lodash/isBoolean';

const COMPONENT_PREFIX = 'nf-flex';

class Flex extends Component {
  static propTypes = {
    /**
     * 元素会被赋予一个容器中自由空间的指定占比
     */
    flex: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    /**
     * 元素会根据自身的宽度与高度来确定尺寸，但是会自行伸长以吸收flex容器中额外的自由空间，也会缩短至自身最小尺寸以适应容器。
     * 这相当于将属性设置为 "flex: 1 1 auto"
     */
    auto: PropTypes.bool,
    /**
     * 元素会根据自身宽高来设置尺寸。它是完全非弹性的：既不会缩短，也不会伸长来适应flex容器。
     * 相当于将属性设置为"flex: 0 0 auto"。
     */
    none: PropTypes.bool,
    /**
     * 自定义宽度
     */
    width: PropTypes.string,
    /**
     * 自定义高度
     */
    height: PropTypes.string,
    /**
     * 排列方向: 行
     */
    row: PropTypes.bool,
    /**
     * 排列方向: 垂直
     */
    column: PropTypes.bool,
    /**
     * 换行
     */
    wrap: PropTypes.bool,
    /**
     * 不换行
     */
    nowrap: PropTypes.bool,
    /**
     * 从行首起始位置开始排列
     */
    justifyStart: PropTypes.bool,
    /**
     * 从行尾位置开始排列
     */
    justifyEnd: PropTypes.bool,
    /**
     * 居中排列
     */
    justifyCenter: PropTypes.bool,
    /**
     * 均匀排列每个元素,首个元素放置于起点，末尾元素放置于终点
     */
    justifyBetween: PropTypes.bool,
    /**
     * 均匀排列每个元素, 每个元素周围分配相同的空间
     */
    justifyAround: PropTypes.bool,
    /**
     * 所有行从垂直轴起点开始填充
     */
    alignStart: PropTypes.bool,
    /**
     * 所有行从垂直轴末尾开始填充
     */
    alignEnd: PropTypes.bool,
    /**
     * 所有行朝向容器的中心填充
     */
    alignCenter: PropTypes.bool,
    /**
     * 所有行轴线排列
     */
    alignBaseline: PropTypes.bool,
    /**
     * 拉伸所有行来填满剩余空间。剩余空间平均的分配给每一行
     */
    alignStretch: PropTypes.bool,
    /**
     * 额外类名
     */
    className: PropTypes.string,
    /**
     * 额外样式
     */
    style: PropTypes.object,
    /**
     * 子组件
     */
    children: PropTypes.any
  }
  render() {
    const {
      flex,
      auto,
      none,
      width,
      height,
      row,
      column,
      wrap,
      nowrap,
      justifyStart,
      justifyEnd,
      justifyCenter,
      justifyBetween,
      justifyAround,
      alignStart,
      alignEnd,
      alignCenter,
      alignBaseline,
      alignStretch,
      className,
      style,
      ...rest
    } = this.props;
    const cn = cx({
      [`${COMPONENT_PREFIX}`]: true,
      [`${COMPONENT_PREFIX}-flex`]: flex,
      [`${COMPONENT_PREFIX}-auto`]: auto,
      [`${COMPONENT_PREFIX}-none`]: none || width || height,
      [`${COMPONENT_PREFIX}-row`]: row,
      [`${COMPONENT_PREFIX}-column`]: column,
      [`${COMPONENT_PREFIX}-wrap`]: wrap,
      [`${COMPONENT_PREFIX}-nowrap`]: nowrap,
      [`${COMPONENT_PREFIX}-justify-start`]: justifyStart,
      [`${COMPONENT_PREFIX}-justify-end`]: justifyEnd,
      [`${COMPONENT_PREFIX}-justify-center`]: justifyCenter,
      [`${COMPONENT_PREFIX}-justify-between`]: justifyBetween,
      [`${COMPONENT_PREFIX}-justify-around`]: justifyAround,
      [`${COMPONENT_PREFIX}-align-start`]: alignStart,
      [`${COMPONENT_PREFIX}-align-end`]: alignEnd,
      [`${COMPONENT_PREFIX}-align-center`]: alignCenter,
      [`${COMPONENT_PREFIX}-align-baseline`]: alignBaseline,
      [`${COMPONENT_PREFIX}-align-stretch`]: alignStretch
    }, className);
    const s = _assign({}, style);
    if (flex) {
      s.flex = (_isBoolean(flex)) ? 1 : flex;
      s.WebKitFlex = (_isBoolean(flex)) ? 1 : flex;
    }
    if (height) s.height = height;
    if (width) s.width = width;
    return (
      <div {...rest} className={cn} style={s}>{this.props.children}</div>
    );
  }
}

export default Flex;