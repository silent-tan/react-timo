import React, { Component } from 'react';
import { Flex, Card } from 'react-timo';
import {ExampleHeader, PropsTable, Demobox} from 'demo-component';

import tabsProps from '!!docgen-loader!../../../../src/component/Tabs/Tabs';
import basicCode from '!!raw-loader!./Basic';
import Basic from './Basic';

class TabsExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex column className="demo-tabs" flex={1}>
        <ExampleHeader
          title="Tabs Component"
          desc="Add quick, dynamic tab functionality to transition through panes of local content,"
        />
        <Card title="Basic Example">
          <Demobox code={basicCode}>
            <Basic />
          </Demobox>
        </Card>
        <PropsTable list={tabsProps}/>
      </Flex>
    );
  }
}

export default TabsExample;