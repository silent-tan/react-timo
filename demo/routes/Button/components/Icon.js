import React, { Component } from 'react';
import {Flex, Button, Icon} from 'react-timo';

class Demo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex column>
        <Flex>
          <Button mode="primary" className="mr-2">
            <Icon type="home" autoFixed/>Home
          </Button>
          <Button mode="info" className="mr-2">
            <Icon type="search" autoFixed/>Search
          </Button>
          <Button mode="success" className="mr-2">
            <Icon type="more-vert" autoFixed/>More
          </Button>
          <Button mode="warning" className="mr-2">
            <Icon type="arrow-forward" autoFixed/>Forward
          </Button>
          <Button mode="danger" className="mr-2">
            <Icon type="arrow-back" autoFixed/>Back
          </Button>
        </Flex>
        <Flex className="mt-3">
          <Button mode="secondary" icon="home" className="mr-2" />
          <Button mode="secondary" icon="search" className="mr-2" />
          <Button mode="secondary" icon="more-vert" className="mr-2" />
          <Button mode="secondary" icon="arrow-forward" className="mr-2" />
          <Button mode="secondary" icon="arrow-back" className="mr-2" />
        </Flex>
        <Flex className="mt-3">
          <Button mode="primary" icon="home" className="mr-2" />
          <Button mode="info" icon="search" className="mr-2" />
          <Button mode="success" icon="more-vert" className="mr-2" />
          <Button mode="warning" icon="arrow-forward" className="mr-2" />
          <Button mode="danger" icon="arrow-back" className="mr-2" />
        </Flex>
      </Flex>
    );
  }
}

export default Demo;