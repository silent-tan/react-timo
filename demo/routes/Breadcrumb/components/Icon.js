import React, { Component } from 'react';
import {Flex, Breadcrumb, Icon} from 'react-timo';

class Demo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href=""><Icon type="home" /></a>
          </Breadcrumb.Item>
          <Breadcrumb.Item><a href=""><Icon type="account" /> Application Center</a></Breadcrumb.Item>
          <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb>
      </Flex>
    );
  }
}

export default Demo;