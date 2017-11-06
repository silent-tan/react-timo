import React, { Component } from 'react';
import { Flex, Card } from 'react-timo';
import {ExampleHeader, PropsTable, Demobox} from 'demo-component';

import selectProps from '!!docgen-loader!../../../../src/component/Select';
import basicCode from '!!raw-loader!./Basic';
import Basic from './Basic';

class ClipboardExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex column className="demo-select" flex={1}>
        <ExampleHeader
          title="Select Component"
          desc="Select UI based on select2"
        />
        <Card title="Basic Example">
          <Demobox code={basicCode}>
            <Basic />
          </Demobox>
        </Card>
        <PropsTable list={selectProps}/>
      </Flex>
    );
  }
}

export default ClipboardExample;