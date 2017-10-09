import React, { Component } from 'react';
import { Flex, Card } from 'react-timo';

import {ExampleHeader, PropsTable, Demobox} from 'demo-component';

import gridProps from '!!docgen-loader!../../../../src/component/Grid';
import demo1Code from '!!raw-loader!./Demo1';
import Demo1 from './Demo1';

import rowProps from '!!docgen-loader!../../../../src/component/Grid/row';
import colProps from '!!docgen-loader!../../../../src/component/Grid/col';
import demo2Code from '!!raw-loader!./Demo2';
import Demo2 from './Demo2';

class LoadingExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex className="demo-grid" column>
        <ExampleHeader
          title="Grid Component"
          desc="The Grid component and it's child component allow you to make the layout quickly"
        />
        <Card title="Basic Grid" desc="Now support the normal grid and the fluid grid">
          <Demobox code={demo1Code}>
            <Demo1 />
          </Demobox>
        </Card>
        <PropsTable list={gridProps}/>
        <Card title="Row and Col Component" desc="Same as the bootstrap row and col-x className">
          <Demobox code={demo2Code}>
            <Demo2 />
          </Demobox>
        </Card>
        <PropsTable list={rowProps} title="Row Props"/>
        <PropsTable list={colProps} title="Col Props"/>
      </Flex>
    );
  }
}

export default LoadingExample;