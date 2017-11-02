import React, { Component } from 'react';
import { Flex, Card } from 'react-timo';
import {ExampleHeader, Demobox} from 'demo-component';

import basicCode from '!!raw-loader!./Basic';
import Basic from './Basic';

class NotificationExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex column className="demo-notification" flex={1}>
        <ExampleHeader
          title="Notification Component"
          desc="Display a notification message globally."
        />
        <Card title="Basic Example">
          <Demobox code={basicCode}>
            <Basic />
          </Demobox>
        </Card>
      </Flex>
    );
  }
}

export default NotificationExample;