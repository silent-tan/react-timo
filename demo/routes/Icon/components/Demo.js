import React, { Component } from 'react';
import {Icon, Flex} from 'react-timo';

class Demo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex alignCenter>
        <Icon type="3d-rotation" />
        <Icon type="airplane-off" />
        <Icon type="airplane" />
      </Flex>
    );
  }
}

export default Demo;