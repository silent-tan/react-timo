import React, { Component } from 'react';
import { Flex, Modal, Button } from 'react-timo';

class Demo extends Component {
  state = {
    show: false
  }

  handleToggleModal = () => {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    return (
      <Flex>
        <Flex>
          <Button onClick={this.handleToggleModal}>Open The Modal</Button>
        </Flex>
        <Modal
          show={this.state.show}
          onClose={this.handleToggleModal}
          title="谭先生说"
        >
          阿狸是最美的
        </Modal>
      </Flex>
    );
  }
}

export default Demo;