import React, { Component } from 'react';
import { Flex, Card } from 'react-timo';
import {ExampleHeader, PropsTable, Demobox} from 'demo-component';

import transferProps from '!!docgen-loader!../../../../src/component/Transfer';
import basicCode from '!!raw-loader!./Basic';
import Basic from './Basic';

class TagExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex column className="demo-transfer" flex={1}>
        <ExampleHeader
          title="Transfer Component"
          desc="Add quick, dynamic tab functionality to transition through panes of local content,"
        />
        <Card title="Basic Example">
          <Demobox code={basicCode}>
            <Basic />
          </Demobox>
        </Card>
        <PropsTable list={transferProps}/>
      </Flex>
    );
  }
}

export default TagExample;