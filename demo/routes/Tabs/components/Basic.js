import React, { PureComponent } from 'react';
import { Flex, Tabs } from 'react-timo';

class Demo extends PureComponent {
  render() {
    return (
      <Flex className="mb-4 py-2 px-2 bg-white" column>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Tab 1" key="1">Tab 1</Tabs.TabPane>
          <Tabs.TabPane tab="Tab 2" disabled key="2">Tab 2</Tabs.TabPane>
          <Tabs.TabPane tab="Tab 3" key="3">Tab 3</Tabs.TabPane>
        </Tabs>
      </Flex>
    );
  }
}

export default Demo;