import React, { Component } from 'react';
import { Flex, Checkbox } from 'react-timo';

class Demo extends Component {
  state = {
    checked: true
  }

  handleChange = checked => {
    this.setState({
      checked
    });
  }

  render() {
    return (
      <Flex column>
        <Flex className="mb-4">
          <Checkbox checked={this.state.checked} onChange={this.handleChange}>Control Checkbox</Checkbox>
        </Flex>
      </Flex>
    );
  }
}

export default Demo;