import React, { Component } from 'react';
import {SubMenu as RcSubMenu} from 'rc-menu';

class SubMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RcSubMenu {...this.props}/>
    );
  }
}

export default SubMenu;