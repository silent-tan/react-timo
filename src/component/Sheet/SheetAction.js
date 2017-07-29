import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SheetAction extends Component {
  static displayName = 'SheetAction'
  static propTypes = {
    children: PropTypes.func.isRequired
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default SheetAction;
