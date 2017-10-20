import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router';
import _noop from 'lodash/noop';

import {Flex, Menu} from 'react-timo';
const { MenuItem } = Menu;

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
    return (
      <Flex className="demo-sidebar mb-4" flex={1} column>
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
          <MenuItem key="collapse" className="p-0">
            <Link
              to="/components/collapse"
              className="demo-sidebar-link"
              activeClassName="demo-sidebar-link-active"
            >Collapse</Link>
          </MenuItem>
          <MenuItem key="grid" className="p-0">
            <Link
              to="/components/grid"
              className="demo-sidebar-link"
              activeClassName="demo-sidebar-link-active"
            >Grid</Link>
          </MenuItem>
          <MenuItem key="flex" className="p-0">
            <Link
              to="/components/flex"
              className="demo-sidebar-link"
              activeClassName="demo-sidebar-link-active"
            >Flex</Link>
          </MenuItem>
          <MenuItem key="breadcrumb" className="p-0">
            <Link
              to="/components/breadcrumb"
              className="demo-sidebar-link"
              activeClassName="demo-sidebar-link-active"
            >Breadcrumb</Link>
          </MenuItem>
          <MenuItem key="checkbox" className="p-0">
            <Link
              to="/components/checkbox"
              className="demo-sidebar-link"
              activeClassName="demo-sidebar-link-active"
            >Checkbox</Link>
          </MenuItem>
          <MenuItem key="radio" className="p-0">
            <Link
              to="/components/radio"
              className="demo-sidebar-link"
              activeClassName="demo-sidebar-link-active"
            >Radio</Link>
          </MenuItem>
          <MenuItem key="datetimepicker" className="p-0">
            <Link
              to="/components/datetimepicker"
              className="demo-sidebar-link"
              activeClassName="demo-sidebar-link-active"
            >DatetimePicker</Link>
          </MenuItem>
          <MenuItem key="dropdown" className="p-0">
            <Link
              to="/components/dropdown"
              className="demo-sidebar-link"
              activeClassName="demo-sidebar-link-active"
            >Dropdown</Link>
          </MenuItem>
          <MenuItem key="modal" className="p-0">
            <Link
              to="/components/modal"
              className="demo-sidebar-link"
              activeClassName="demo-sidebar-link-active"
            >Modal</Link>
          </MenuItem>
          <MenuItem key="notification" className="p-0">
            <Link
              to="/components/notification"
              className="demo-sidebar-link"
              activeClassName="demo-sidebar-link-active"
            >Notification</Link>
          </MenuItem>
          <MenuItem key="popover" className="p-0">
            <Link
              to="/components/popover"
              className="demo-sidebar-link"
              activeClassName="demo-sidebar-link-active"
            >Popover</Link>
          </MenuItem>
          <MenuItem key="select" className="p-0">
            <Link
              to="/components/select"
              className="demo-sidebar-link"
              activeClassName="demo-sidebar-link-active"
            >Select</Link>
          </MenuItem>
          <MenuItem key="sheet" className="p-0">
            <Link
              to="/components/sheet"
              className="demo-sidebar-link"
              activeClassName="demo-sidebar-link-active"
            >Sheet</Link>
          </MenuItem>
          <MenuItem key="slick" className="p-0">
            <Link
              to="/components/slick"
              className="demo-sidebar-link"
              activeClassName="demo-sidebar-link-active"
            >Slick</Link>
          </MenuItem>
          <MenuItem key="switch" className="p-0">
            <Link
              to="/components/switch"
              className="demo-sidebar-link"
              activeClassName="demo-sidebar-link-active"
            >Switch</Link>
          </MenuItem>
          <MenuItem key="tabs" className="p-0">
            <Link
              to="/components/tabs"
              className="demo-sidebar-link"
              activeClassName="demo-sidebar-link-active"
            >Tabs</Link>
          </MenuItem>
          <MenuItem key="tag" className="p-0">
            <Link
              to="/components/tag"
              className="demo-sidebar-link"
              activeClassName="demo-sidebar-link-active"
            >Tag</Link>
          </MenuItem>
          <MenuItem key="transfer" className="p-0">
            <Link
              to="/components/transfer"
              className="demo-sidebar-link"
              activeClassName="demo-sidebar-link-active"
            >Transfer</Link>
          </MenuItem>
          <MenuItem key="tooltip" className="p-0">
            <Link
              to="/components/tooltip"
              className="demo-sidebar-link"
              activeClassName="demo-sidebar-link-active"
            >Tooltip</Link>
          </MenuItem>
          <MenuItem key="pagination" className="p-0">
            <Link
              to="/components/pagination"
              className="demo-sidebar-link"
              activeClassName="demo-sidebar-link-active"
            >Pagination</Link>
          </MenuItem>
        </Menu>
      </Flex>
    );
  }
}

export default SideBar;