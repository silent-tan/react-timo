import React, { Component } from 'react';
import { Flex, Card } from 'react-timo';
import {ExampleHeader, PropsTable, Demobox} from 'demo-component';

import switchProps from '!!docgen-loader!../../../../src/component/Switch';
import basicCode from '!!raw-loader!./Basic';
import Basic from './Basic';

class ClipboardExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex column className="demo-switch" flex={1}>
        <ExampleHeader
          title="Switch Component"
          desc="Material design look alike Toggle Switches based on CSS3"
        />
        <Card title="Basic Example">
          <Demobox code={basicCode}>
            <Basic />
          </Demobox>
        </Card>
        <PropsTable list={switchProps}/>
      </Flex>
    );
  }
}

export default ClipboardExample;