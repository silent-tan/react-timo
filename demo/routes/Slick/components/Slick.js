import React, { Component } from 'react';
import { Flex, Card } from 'react-timo';
import {ExampleHeader, PropsTable, Demobox} from 'demo-component';

import slickProps from '!!docgen-loader!../../../../src/component/Slick';
import basicCode from '!!raw-loader!./Basic';
import Basic from './Basic';

class ClipboardExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex column className="demo-slick" flex={1}>
        <ExampleHeader
          title="Slick Component"
          desc="carousel base on react-slick"
        />
        <Card title="Basic Example">
          <Demobox code={basicCode}>
            <Basic />
          </Demobox>
        </Card>
        <PropsTable list={slickProps}/>
      </Flex>
    );
  }
}

export default ClipboardExample;