import React, { Component } from 'react';
import { Flex, Card } from 'react-timo';
import {ExampleHeader, PropsTable, Demobox} from 'demo-component';

import tooltipProps from '!!docgen-loader!../../../../src/component/Tooltip';
import basicCode from '!!raw-loader!./Basic';
import Basic from './Basic';

class PopoverExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex column className="demo-tooltip" flex={1}>
        <ExampleHeader
          title="Tooltip Component"
          desc="Inspired by rc-tooltip"
        />
        <Card title="Different trigger">
          <Demobox code={basicCode}>
            <Basic />
          </Demobox>
        </Card>
        <PropsTable list={tooltipProps}/>
      </Flex>
    );
  }
}

export default PopoverExample;