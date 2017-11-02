import React, { Component } from 'react';
import { Flex, Radio } from 'react-timo';

class Demo extends Component {
  state = {
    options: [{
      label: 'Group child 1',
      value: 1
    },{
      label: 'Group child 2',
      value: 2,
      disabled: true
    }, {
      label: 'Group child 3',
      value: 3
    }],
    value: 1
  }

  handleChange = (value) => {
    this.setState({
      value
    });
  }

  render() {
    return (
      <Flex>
        <Radio.Group
          options={this.state.options}
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        />
      </Flex>
    );
  }
}

export default Demo;