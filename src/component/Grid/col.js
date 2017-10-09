import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Col extends Component {
  static propTypes = {
    /**
     * 栅格个数
     */
    span: PropTypes.number,
    /**
     * 自适应断点
     */
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
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
  static defaultProps = {
    span: 12,
    size: 'sm',
    className: '',
    style: {}
  }
  static MAX_COLMUNS_LENGTH = 12
  constructor(props) {
    super(props);
  }

  static validate(span, offset) {
    if(span + offset > Col.MAX_COLMUNS_LENGTH) {
      console.error(`span: ${span}, offset: ${offset} 两者相加大于 ${Col.MAX_COLMUNS_LENGTH}`);
      return false;
    }
    return true;
  }

  render() {
    const {
      size,
      span,
      className,
      style,
      children
    } = this.props;

    const cls = cx({
      [`col-${size}-${span}`]: true
    }, className);

    return (
      <div className={cls} style={style}>
        {children}
      </div>
    );
  }
}

export default Col;