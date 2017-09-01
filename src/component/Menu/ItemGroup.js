import React, { Component } from 'react';
import {ItemGroup as RcItemGroup} from 'rc-menu';

class ItemGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RcItemGroup {...this.props}/>
    );
  }
}

export default ItemGroup;