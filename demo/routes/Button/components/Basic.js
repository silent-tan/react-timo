import React, { Component } from 'react';
import {Flex, Button} from 'react-timo';

class Demo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex>
        <Button mode="primary" className="mr-2">Primary</Button>
        <Button mode="secondary" className="mr-2">Secondary</Button>
        <Button mode="info" className="mr-2">Info</Button>
        <Button mode="success" className="mr-2">Success</Button>
        <Button mode="warning" className="mr-2">Warning</Button>
        <Button mode="danger" className="mr-2">Danger</Button>
        <Button mode="link" className="mr-2">Link</Button>
      </Flex>
    );
  }
}

export default Demo;