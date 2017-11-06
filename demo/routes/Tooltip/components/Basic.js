import React, { Component } from 'react';
import {Flex, Tooltip, Button} from 'react-timo';

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
      <Flex column>
        <Flex className="mb-2">
          <Tooltip placement="topLeft" content="Prompt Text" >
            <span>这是一段文字</span>
          </Tooltip>
        </Flex>
        <Flex>
          <Tooltip placement="topLeft" content="Prompt Text" arrowPointAtCenter trigger="click">
            <Button>Arrow points to center / 箭头指向中心</Button>
          </Tooltip>
        </Flex>
      </Flex>
    );
  }
}

export default Demo;