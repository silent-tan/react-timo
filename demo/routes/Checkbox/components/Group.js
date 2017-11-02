import React, { Component } from 'react';
import { Flex, Checkbox } from 'react-timo';

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
    values: [1]
  }

  handleChange = (values) => {
    this.setState({
      values
    });
  }

  render() {
    return (
      <Flex column>
        <Flex>
          <Checkbox.Group
            options={this.state.options}
            values={this.state.values}
            onChange={this.handleChange}
          />
        </Flex>
      </Flex>
    );
  }
}

export default Demo;