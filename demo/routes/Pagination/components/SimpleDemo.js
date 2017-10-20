import React, { Component } from 'react';
import {Flex, Pagination} from 'react-timo';

class Demo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex>
        <Pagination total={500} defaultCurrent={21} simple={true}/>
      </Flex>
    );
  }
}

export default Demo;