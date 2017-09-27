import React, { Component } from 'react';
import {Flex, Button} from 'react-timo';

class Demo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex>
        <Button mode="primary" className="mr-2" outline>Primary</Button>
        <Button mode="secondary" className="mr-2" outline>Secondary</Button>
        <Button mode="info" className="mr-2" outline>Info</Button>
        <Button mode="success" className="mr-2" outline>Success</Button>
        <Button mode="warning" className="mr-2" outline>Warning</Button>
        <Button mode="danger" className="mr-2" outline>Danger</Button>
      </Flex>
    );
  }
}

export default Demo;