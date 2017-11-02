import React, { Component } from 'react';
import {Flex, Dropdown, Menu, Button} from 'react-timo';
const { MenuItem } = Menu;

class Demo extends Component {
  state = {
    value: ''
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  render() {
    return (
      <Flex>
        <Dropdown
          overlay={
            <Menu
              onClick={this.handleMenuClick}>
              <MenuItem key="1">Clicking me will not close the menu.</MenuItem>
              <MenuItem key="2">Clicking me will not close the menu also.</MenuItem>
              <MenuItem key="3">Clicking me will close the menu</MenuItem>
            </Menu>
          }
          trigger="click"
        >
          <Button>Click Me!</Button>
        </Dropdown>
      </Flex>
    );
  }
}

export default Demo;