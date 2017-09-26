import React, {Component} from 'react';
import PropTypes from 'prop-types';

import _isObject from 'lodash/isObject';
import {Highlight} from 'react-timo';

class ObjectView extends Component {
  static propTypes = {
    object: PropTypes.any
  }

  static defaultProps = {
    object: {}
  }

  render() {
    const { object } = this.props;
    let code = object;
    if (_isObject(object)) {
      code = JSON.stringify(code, null, 4);
    }
    return (
      <Highlight>{code}</Highlight>
    );
  }
}

export default ObjectView;