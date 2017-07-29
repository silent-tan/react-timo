import React from 'react';
import PropTypes from 'prop-types';

class SheetBatchAction extends React.Component {
  static displayName = 'SheetBatchAction'
  static propTypes = {
    children: PropTypes.object.isRequired
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default SheetBatchAction;