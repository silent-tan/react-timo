import React, { Component } from 'react';
import { Flex, DatetimePicker } from 'react-timo';

class Demo extends Component {
  render() {
    return (
      <Flex column>
        <Flex>
          <DatetimePicker />
        </Flex>
        <Flex className="mt-2rem">
          <DatetimePicker enable={false}/>
        </Flex>
      </Flex>
    );
  }
}

export default Demo;