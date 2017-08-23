import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _omit from 'lodash/omit';

class LazyRenderBox extends Component {
  static propTypes = {
    hiddenClassName: PropTypes.string,
    className: PropTypes.string,
    visible: PropTypes.bool,
    style: PropTypes.object
  }
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return !!nextProps.hiddenClassName || !!nextProps.visible;
  }

  render() {
    let {className} = this.props;
    const {hiddenClassName, visible} = this.props;
    if(!!hiddenClassName && !visible) {
      className += ` ${hiddenClassName}`;
    }
    return (
      <div
        className={className}
        {..._omit(this.props, ['hiddenClassName', 'visible', 'className'])}
      />
    );
  }
}

export default LazyRenderBox;