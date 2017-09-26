import React, { Component } from 'react';
import {Flex, Loading} from 'react-timo';

class Demo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex>
        <Loading size="sm" />
        <Loading size="md"/>
        <Loading size="lg" />
      </Flex>
    );
  }
}

export default Demo;