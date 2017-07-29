import React, {Component} from 'react';
import PropTypes from 'prop-types';
import constant from 'lodash/constant';

class SheetSelect extends Component {
  static displayName = 'SheetSelect'
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    onSelectAll: PropTypes.func.isRequired,
    isDisabled: PropTypes.func
  }
  static defaultProps = {
    isDisabled: constant(false)
  }
  render() {
    return <div />;
  }
}

export default SheetSelect;