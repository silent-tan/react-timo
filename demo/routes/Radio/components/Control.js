import React, { Component } from 'react';
import { Flex, Radio } from 'react-timo';

class Demo extends Component {
  state = {
    value: 1
  }
  handleChange = (value) => {
    this.setState({
      value
    });
  }
  render() {
    return (
      <Flex column>
        <Flex className="mb-4">
          <Radio checked={this.state.value === 1} value={1} onChange={this.handleChange}>Radio 1</Radio>
          <Radio checked={this.state.value === 2} value={2} onChange={this.handleChange}>Radio 2</Radio>
          <Radio checked={this.state.value === 3} value={3} onChange={this.handleChange}>Radio 3</Radio>
        </Flex>
      </Flex>
    );
  }
}

export default Demo;