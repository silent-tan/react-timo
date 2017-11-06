import React, { Component } from 'react';
import { Flex, Card } from 'react-timo';
import {ExampleHeader, PropsTable, Demobox} from 'demo-component';

import popoverProps from '!!docgen-loader!../../../../src/component/Popover';
import basicCode from '!!raw-loader!./Basic';
import Basic from './Basic';

class PopoverExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex column className="demo-popover" flex={1}>
        <ExampleHeader
          title="Popover Component"
          desc="Add small overlay content, like those found in iOS, to any element for housing secondary information"
        />
        <Card title="Basic Example">
          <Demobox code={basicCode}>
            <Basic />
          </Demobox>
        </Card>
        <PropsTable list={popoverProps}/>
      </Flex>
    );
  }
}

export default PopoverExample;