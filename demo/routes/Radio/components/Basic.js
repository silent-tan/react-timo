import React, { Component } from 'react';
import { Flex, Radio } from 'react-timo';

class Demo extends Component {
  render() {
    return (
      <Flex column>
        <Flex className="mb-4">
          <Radio>Default unchecked</Radio>
          <Radio defaultChecked={true}>Default checked</Radio>
          <Radio disabled>Disabled</Radio>
        </Flex>
      </Flex>
    );
  }
}

export default Demo;