import React, { Component } from 'react';
import { Flex, Card } from 'react-timo';
import {ExampleHeader, PropsTable, Demobox} from 'demo-component';

import sheetProps from '!!docgen-loader!../../../../src/component/Sheet';
import basicCode from '!!raw-loader!./Basic';
import Basic from './Basic';

class ClipboardExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex column className="demo-sheet" flex={1}>
        <ExampleHeader
          title="Sheet Component"
          desc="Create your table quicky"
        />
        <Card title="Basic Example">
          <Demobox code={basicCode}>
            <Basic />
          </Demobox>
        </Card>
        <PropsTable list={sheetProps}/>
      </Flex>
    );
  }
}

export default ClipboardExample;