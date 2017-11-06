import React, { Component } from 'react';
import {Flex, Popover, Button} from 'react-timo';

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
        <Popover
          placement="topLeft"
          title="Popover Title"
          content="And here's some amazing content. It's very engaging. Right?"
          trigger="click"
        >
          <Button>Popover</Button>
        </Popover>
      </Flex>
    );
  }
}

export default Demo;