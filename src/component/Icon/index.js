import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Icon extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    rest: PropTypes.any
  }
  static defaultProps = {
    style: {},
    className: ''
  }
  constructor(props) {
    super(props);
  }

  render() {
    const {
      type,
      style,
      className,
      rest
    } = this.props;
    return (
      <i
        className={`zmdi zmdi-${type} ${className}`}
        style={style}
        {...rest}
      />
    );
  }

}

export default Icon;