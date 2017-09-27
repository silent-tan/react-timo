import React, { Component } from 'react';
import {Flex, Menu} from 'react-timo';
import {Link, hashHistory} from 'react-router';

class NavTop extends Component {
  constructor(props) {
    super(props);
  }

  handleGoHome() {
    hashHistory.push('/home');
  }

  render() {
    return (
      <Flex className="bg-white box-shadow demo-nav-top px-5">
        <Flex alignCenter className="px-4 nav-top-logo" onClick={this.handleGoHome.bind(this)}>
          <Flex height="20px" width="20px">
            <img src="./demo/asset/timo_logo.svg" style={{width: '100%', maxHeight: '100%'}}/>
          </Flex>
          <Flex className="ml-2 nav-top-title">TimoUI</Flex>
        </Flex>
        <Flex flex={1}>
          <Menu justify="end">
            <Menu.MenuItem className="nav-top-menu-item">
              <Link to="/standard" className="nav-top-menu-link">UI 规范</Link>
            </Menu.MenuItem>
            <Menu.MenuItem className="nav-top-menu-item">
              <Link to="/components" className="nav-top-menu-link">组 件</Link>
            </Menu.MenuItem>
          </Menu>
        </Flex>
      </Flex>
    );
  }
}

export default NavTop;