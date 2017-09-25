import React, { Component } from 'react';
import {
  Flex,
  Loading
} from '../../../../src';

class LoadingExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex className="demo-loading">
        <Loading />
      </Flex>
    );
  }
}

export default LoadingExample;