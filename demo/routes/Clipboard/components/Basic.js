import React, { Component } from 'react';
import {Flex, Clipboard} from 'react-timo';

class Demo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex>
        <Clipboard text="复制这一行字">
          <a href="javascript:;">复制</a>
        </Clipboard>
      </Flex>
    );
  }
}

export default Demo;