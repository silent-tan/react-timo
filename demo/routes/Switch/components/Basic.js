import React, { PureComponent } from 'react';
import { Flex, Switch } from 'react-timo';

class Demo extends PureComponent {
  render() {
    return (
      <Flex>
        <Switch className="mr-5"/>
        <Switch disabled/>
      </Flex>
    );
  }
}

export default Demo;