import React, { Component } from 'react';
import PropTypes from 'react';
import noop from 'lodash/noop';

class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    disabled: PropTypes.bool,
    children: PropTypes.any
  }

  static defaultProps = {
    className: 'btn btn-secondary',
    disabled: false,
    onClick: noop,
    onFocus: noop
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {
      children,
      ...rest
    } = this.props;

    return (
      <div {...rest}>
        { children }
      </div>
    );
  }
}

export default Button;
