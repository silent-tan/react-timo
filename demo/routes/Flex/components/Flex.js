import React, { Component } from 'react';
import { Flex, Card } from 'react-timo';

import {ExampleHeader, PropsTable, Demobox} from 'demo-component';

import flexProps from '!!docgen-loader!../../../../src/component/Flex';
import demo1Code from '!!raw-loader!./Demo1';
import Demo1 from './Demo1';

class FlexExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex className="demo-flex" column flex={1}>
        <ExampleHeader
          title="Flex Component"
          desc="Flexbox layout"
        />
        <Card title="Example">
          <Demobox code={demo1Code}>
            <Demo1 />
          </Demobox>
        </Card>
        <PropsTable list={flexProps}/>
      </Flex>
    );
  }
}

export default FlexExample;