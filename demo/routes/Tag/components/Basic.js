import React, { PureComponent } from 'react';
import { Flex, Tag } from 'react-timo';

class Demo extends PureComponent {
  render() {
    return (
      <Flex className="py-2 px-2">
        <Tag color="blue" closable>Tag 1</Tag>
        <Tag color="blue">Can not be closed</Tag>
        <Tag color="blue" closable onClose={e => e.preventDefault()}>preventDefault</Tag>
      </Flex>
    );
  }
}

export default Demo;