import './_style.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import assign from 'lodash/assign';
import isBoolean from 'lodash/isBoolean';

const COMPONENT_PREFIX = 'nf-flex';

class Flex extends Component {
  static propTypes = {
    flex: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    auto: PropTypes.bool,
    none: PropTypes.bool,
    width: PropTypes.string,
    height: PropTypes.string,
    row: PropTypes.bool,
    column: PropTypes.bool,
    wrap: PropTypes.bool,
    nowrap: PropTypes.bool,
    justifyStart: PropTypes.bool,
    justifyEnd: PropTypes.bool,
    justifyCenter: PropTypes.bool,
    justifyBetween: PropTypes.bool,
    justifyAround: PropTypes.bool,
    alignStart: PropTypes.bool,
    alignEnd: PropTypes.bool,
    alignCenter: PropTypes.bool,
    alignBaseline: PropTypes.bool,
    alignStretch: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
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
    const s = assign({}, style);
    if (flex) {
      s.flex = (isBoolean(flex)) ? 1 : flex;
      s.WebKitFlex = (isBoolean(flex)) ? 1 : flex;
    }
    if (height) s.height = height;
    if (width) s.width = width;
    return (
      <div {...rest} className={cn} style={s}>{this.props.children}</div>
    );
  }
}

export default Flex;