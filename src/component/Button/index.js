import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    className: 'btn btn-secondary',
    disabled: false,
    onClick: _.noop,
    onFocus: _.noop
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
