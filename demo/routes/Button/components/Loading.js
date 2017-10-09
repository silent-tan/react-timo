import React, { Component } from 'react';
import {Flex, Button} from 'react-timo';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  handleClick() {
    this.setState({
      loading: true
    }, () => {
      setTimeout(() => {
        this.setState({
          loading: false
        });
      }, 3000);
    });
  }

  render() {
    return (
      <Flex>
        <Button
          mode="primary"
          className="mr-2"
          loading={this.state.loading}
          onClick={this.handleClick.bind(this)}
        >Primary</Button>
      </Flex>
    );
  }
}

export default Demo;