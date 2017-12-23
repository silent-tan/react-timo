import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Flex, Menu} from 'react-timo';
import {Link, hashHistory} from 'react-router';
import _startsWith from 'lodash/startsWith';

class NavTop extends Component {
  static propTypes = {
    pathname: PropTypes.string
  }
  constructor(props) {
    super(props);
  }

  handleGoHome() {
    hashHistory.push('/home');
  }

  checkActive = () => {
    const { pathname } = this.props;
    if(_startsWith(pathname, '/components')) {
      return 'components';
    } else if(_startsWith(pathname, '/standard')) {
      return 'standard';
    } else if(_startsWith(pathname, '/support')) {
      return 'support';
    }
    return 'home';
  }

  render() {
    const active = [this.checkActive()];
    return (
      <Flex className="bg-white box-shadow demo-nav-top px-5">
        <Flex alignCenter className="px-4 nav-top-logo" onClick={this.handleGoHome.bind(this)}>
          <Flex height="40px" width="40px">
            <img src="http://oxjqty7ze.bkt.clouddn.com/logo.svg" style={{width: '100%', maxHeight: '100%'}}/>
          </Flex>
          <Flex className="ml-2 nav-top-title">TimoUI</Flex>
        </Flex>
        <Flex flex={1}>
          <Menu justify="end" selectedKeys={active}>
            <Menu.MenuItem className="nav-top-menu-item" key="home">
              <Link to="/home" className="nav-top-menu-link">首页</Link>
            </Menu.MenuItem>
            <Menu.MenuItem className="nav-top-menu-item" key="standard">
              <Link to="/standard" className="nav-top-menu-link">UI 规范</Link>
            </Menu.MenuItem>
            <Menu.MenuItem className="nav-top-menu-item" key="components">
              <Link to="/components" className="nav-top-menu-link">组 件</Link>
            </Menu.MenuItem>
          </Menu>
        </Flex>
      </Flex>
    );
  }
}

export default NavTop;