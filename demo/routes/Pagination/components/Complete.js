import React, { Component } from 'react';
import {Flex, Pagination} from 'react-timo';

class Demo extends Component {
  constructor(props) {
    super(props);
  }

  handleChange(current, pageSize) {
    console.warn(current, pageSize);
  }

  render() {
    return (
      <Flex>
        <Pagination
          showSizeChanger
          onShowSizeChange={this.handleChange}
          defaultCurrent={3}
          total={500}
          showQuickJumper
          showTotal={( total, range ) => `总共${total}项, 当前${range[0]}-${range[1]}`}
        />
      </Flex>
    );
  }
}

export default Demo;