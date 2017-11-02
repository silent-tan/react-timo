import React, { Component } from 'react';
import {Flex, Button, Notification} from 'react-timo';

class Demo extends Component {
  static MESSAGE = 'Bootstrap Notify Turning standard Bootstrap alerts into awesome notifications'
  handleClick(type) {
    switch (type) {
      case 'success':
        Notification.success(Demo.MESSAGE);
        break;
    
      default:
        break;
    }
  }

  render() {
    return (
      <Flex>
        <Button
          mode="success"
          onClick={this.handleClick.bind(this, 'success')}
        >Success</Button>
      </Flex>
    );
  }
}

export default Demo;