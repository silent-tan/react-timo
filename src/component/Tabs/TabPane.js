import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TabPane as RcTabPane} from 'rc-tabs';

class TabPane extends Component {
  static propTypes = {
    tab: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string
    ]),
    style: PropTypes.object,
    closable: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool
  }

  render() {
    return (
      <RcTabPane {...this.props}/>
    );
  }
}

export default TabPane;