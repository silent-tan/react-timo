import React, { Component } from 'react';
import {Flex, Breadcrumb} from 'react-timo';

class Demo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item><a href="">Application Center</a></Breadcrumb.Item>
          <Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
          <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb>
      </Flex>
    );
  }
}

export default Demo;