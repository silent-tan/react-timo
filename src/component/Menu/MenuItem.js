import React, { Component } from 'react';
import { MenuItem as RcMenuItem } from 'rc-menu';

class MenuItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RcMenuItem {...this.props}/>
    );
  }
}

export default MenuItem;