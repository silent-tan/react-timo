import React, { Component } from 'react';
import {Flex, Menu} from '../../src/index';

class NavTop extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex className="bg-white box-shadow demo-nav-top px-5">
        <Flex alignCenter className="px-4">Timo</Flex>
        <Flex flex={1}>
          <Menu justify="end">
            <Menu.MenuItem><div className="nav-top-menu">UI 规范</div></Menu.MenuItem>
            <Menu.MenuItem><div className="nav-top-menu">组 件</div></Menu.MenuItem>
          </Menu>
        </Flex>
      </Flex>
    );
  }
}

export default NavTop;