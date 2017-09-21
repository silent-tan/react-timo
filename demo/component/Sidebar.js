import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router';
import _noop from 'lodash/noop';

import {Flex, Menu} from '../../src/index';
const { SubMenu, MenuItem } = Menu;

class Link extends Component {
  static propTypes = {
    to: PropTypes.string
  }
  constructor(props) {
    super(props);
  }
  handleClick(e) {
    const oldHash = window.location.hash.substr(1);
    if(oldHash === this.props.to) e.preventDefault();
  }
  render() {
    return (
      <RouterLink {...this.props} onClick={this.handleClick.bind(this)}/>
    );
  }
}

class SideBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const titleRight = (
      <Flex alignCenter>
        <span>sub menu</span>
        <i className="zmdi zmdi-caret-right ml-2"/>
      </Flex>
    );
    const titleRight1 = (
      <Flex alignCenter>
        <span>sub menu1</span>
        <i className="zmdi zmdi-caret-right ml-2"/>
      </Flex>
    );
    const titleRight2 = (
      <Flex alignCenter>
        <span>sub menu2</span>
        <i className="zmdi zmdi-caret-right ml-2"/>
      </Flex>
    );
    const titleRight3 = (
      <Flex alignCenter>
        <span>sub menu3</span>
        <i className="zmdi zmdi-caret-right ml-2"/>
      </Flex>
    );
    return (
      <Flex className="mb-4" flex={1}>
        <Menu mode="inline" onSelect={_noop} defaultActiveFirst onClick={_noop} >
          <MenuItem key="icon">
            <Link to="/icon">Icon</Link>
          </MenuItem>
          <SubMenu title={titleRight} key="1">
            <MenuItem key="1-1">0-1</MenuItem>
            <MenuItem key="1-2">0-2</MenuItem>
          </SubMenu>
          <MenuItem>
            <a href="http://taobao.com">i do not need key</a>
          </MenuItem>
          <MenuItem key="3">outer</MenuItem>
          <SubMenu title={titleRight1} key="4">
            <MenuItem key="4-1">inner inner</MenuItem>
            <SubMenu
              key="4-2"
              title={titleRight2}
            >
              <MenuItem key="4-2-1">inn</MenuItem>
              <SubMenu title={titleRight3} key="4-2-2">
                <MenuItem key="4-2-2-1">inner inner</MenuItem>
                <MenuItem key="4-2-2-2">inner inner2</MenuItem>
              </SubMenu>
            </SubMenu>
          </SubMenu>
          <MenuItem disabled>disabled</MenuItem>
          <MenuItem key="4-3">outer3</MenuItem>
        </Menu>
      </Flex>
    );
  }
}

export default SideBar;