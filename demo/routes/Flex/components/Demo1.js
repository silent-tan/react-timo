import React, { Component } from 'react';
import {Flex} from 'react-timo';

class Demo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex className="p-4" style={{background: '#f3f3f3'}} column>
        <Flex>direction: row</Flex>
        <Flex className="mb-3">
          <Flex flex className="p-2 bg-white">Flex 1</Flex>
          <Flex flex={2} className="p-2 bg-cyan">Flex 2</Flex>
          <Flex flex={3} className="p-2 bg-pink">Flex 3</Flex>
        </Flex>
        <Flex>direction: column</Flex>
        <Flex column height='150px' className="mb-3">
          <Flex flex className="p-2 bg-white">Flex 1</Flex>
          <Flex flex={2} className="p-2 bg-cyan">Flex 2</Flex>
          <Flex flex={3} className="p-2 bg-pink">Flex 3</Flex>
        </Flex>
        <Flex>justify-content</Flex>
        <Flex justifyStart>
          <Flex className="p-2 bg-white">Start</Flex>
          <Flex className="p-2 bg-cyan">Start</Flex>
          <Flex className="p-2 bg-pink">Start</Flex>
        </Flex>
        <Flex justifyEnd>
          <Flex className="p-2 bg-white">End</Flex>
          <Flex className="p-2 bg-cyan">End</Flex>
          <Flex className="p-2 bg-pink">End</Flex>
        </Flex>
        <Flex justifyCenter>
          <Flex className="p-2 bg-white">Center</Flex>
          <Flex className="p-2 bg-cyan">Center</Flex>
          <Flex className="p-2 bg-pink">Center</Flex>
        </Flex>
      </Flex>
    );
  }
}

export default Demo;