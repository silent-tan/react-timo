import React, { Component } from 'react';
import { Flex, Checkbox } from 'react-timo';

class Demo extends Component {
  render() {
    return (
      <Flex column>
        <Flex className="mb-4">
          <Checkbox>Default unchecked</Checkbox>
          <Checkbox defaultChecked={true}>Default checked</Checkbox>
          <Checkbox disabled>Disabled</Checkbox>
        </Flex>
      </Flex>
    );
  }
}

export default Demo;