import React, { Component } from 'react';
import {Flex, Loading} from 'react-timo';

class Demo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex>
        <Loading width={80} />
      </Flex>
    );
  }
}

export default Demo;