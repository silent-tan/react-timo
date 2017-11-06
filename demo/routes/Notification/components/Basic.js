import React, { Component } from 'react';
import {Flex, Button, Notification} from 'react-timo';

class Demo extends Component {
  static MESSAGE = 'Bootstrap Notify Turning standard Bootstrap alerts into awesome notifications'
  handleClick(type) {
    Notification[type](Demo.MESSAGE);
  }

  render() {
    return (
      <Flex>
        <Button
          className="mr-2"
          mode="success"
          onClick={this.handleClick.bind(this, 'success')}
        >Success</Button>
        <Button
          className="mr-2"
          mode="danger"
          onClick={this.handleClick.bind(this, 'danger')}
        >Danger</Button>
      </Flex>
    );
  }
}

export default Demo;