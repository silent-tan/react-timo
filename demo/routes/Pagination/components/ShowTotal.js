import React, { Component } from 'react';
import {Flex, Pagination} from 'react-timo';

class Demo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex column>
        <Flex>
          <Pagination total={500} defaultCurrent={21} showTotal={total => `总共${total}项`}/>
        </Flex>
        <Flex>
          <Pagination
            total={500}
            defaultCurrent={21}
            showTotal={( total, range ) => `总共${total}项, 当前${range[0]}-${range[1]}`}/>
        </Flex>
      </Flex>
    );
  }
}

export default Demo;