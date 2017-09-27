import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router';
import _noop from 'lodash/noop';

import {Flex, Menu} from 'react-timo';
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
    const icon = (
      <i className="zmdi zmdi-menu ml-2" style={{
        position: 'relative',
        top: 2
      }}/>
    );

    const titleRight = (
      <Flex alignCenter justifyBetween>
        <span>sub menu</span>
        {icon}
      </Flex>
    );

    // const path = window.location.hash.substr(1);

    return (
      <Flex className="demo-sidebar mb-4" flex={1}>
        <Menu mode="inline" onSelect={_noop} onClick={_noop} >
          <MenuItem key="icon" className="p-0">
            <Link to="/components/icon" className="demo-sidebar-link" activeClassName="demo-sidebar-link-active">Icon</Link>
          </MenuItem>
          <MenuItem key="loading" className="p-0">
            <Link to="/components/loading" className="demo-sidebar-link" activeClassName="demo-sidebar-link-active">Loading</Link>
          </MenuItem>
          <MenuItem key="card" className="p-0">
            <Link to="/components/card" className="demo-sidebar-link" activeClassName="demo-sidebar-link-active">Card</Link>
          </MenuItem>
          <MenuItem key="button" className="p-0">
            <Link
              to="/components/button"
              className="demo-sidebar-link"
              activeClassName="demo-sidebar-link-active"
            >Button</Link>
          </MenuItem>
          <SubMenu title={titleRight} key="1">
            <MenuItem key="1-1">0-1</MenuItem>
            <MenuItem key="1-2">0-2</MenuItem>
          </SubMenu>
        </Menu>
      </Flex>
    );
  }
}

export default SideBar;