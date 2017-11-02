import React, { Component } from 'react';
import {Flex, Clipboard} from 'react-timo';

class Demo extends Component {
  state = {
    value: ''
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  render() {
    return (
      <Flex>
        <Flex>
          <div className="form-group mb-0">
            <input
              className="form-control input-mask"
              value={ this.state.value }
              onChange={ this.handleChange }
              placeholder="输入要复制的文字"
            />
            <i className="form-group__bar" />
          </div>
        </Flex>
        <Flex alignCenter className="ml-3">
          <Clipboard text={this.state.value}>
            <a href="javascript:;">复制</a>
          </Clipboard>
        </Flex>
      </Flex>
    );
  }
}

export default Demo;