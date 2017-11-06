import React, { Component } from 'react';
import { Flex, Select } from 'react-timo';

class Demo extends Component {
  state = {
    options: [
      {
        name: '测试1',
        value: 1
      },{
        name: '测试2',
        value: 2
      }, {
        name: '测试3',
        value: 3
      }
    ]
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  render() {
    return (
      <Flex>
        <Flex width="200px">
          <Select options={this.state.options} />
        </Flex>
      </Flex>
    );
  }
}

export default Demo;