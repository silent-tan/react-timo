import React, { Component } from 'react';
import {
  Flex,
  Loading
} from 'react-timo';

import Demo from '../../../component/demo';

class LoadingExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex className="demo-loading" column>
        <Flex>
          <Loading />
        </Flex>
        <Demo />
      </Flex>
    );
  }
}

export default LoadingExample;