import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Col extends Component {
  static propTypes = {
    span: PropTypes.number,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    offset: PropTypes.number,
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.any
  }
  static defaultProps = {
    span: 12,
    size: 'sm',
    offset: 0,
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
      offset,
      className,
      style,
      children
    } = this.props;

    const cls = cx({
      [`col-${size}-${span}`]: true,
      [`col-${size}-offset-${offset}`]: Col.validate(span, offset)
    }, className);

    return (
      <div className={cls} style={style}>
        {children}
      </div>
    );
  }
}

export default Col;