import React, { Component } from 'react';
import {Divider as RcDivider} from 'rc-menu';

class Divider extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RcDivider {...this.props}/>
    );
  }
}

export default Divider;