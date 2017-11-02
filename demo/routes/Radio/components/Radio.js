import React, { Component } from 'react';
import { Flex, Card } from 'react-timo';
import {ExampleHeader, PropsTable, Demobox} from 'demo-component';

import radioProps from '!!docgen-loader!../../../../src/component/Radio/Radio';
import groupProps from '!!docgen-loader!../../../../src/component/Radio/Group';
import basicCode from '!!raw-loader!./Basic';
import Basic from './Basic';

import groupCode from '!!raw-loader!./Group';
import Group from './Group';

import controlCode from '!!raw-loader!./Control';
import Control from './Control';

class CheckboxExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex column className="demo-redio" flex={1}>
        <ExampleHeader
          title="Radio Component"
          desc="A single radio for input types that improves the layout and behavior of their HTML elements"
        />
        <Card title="Basic Radio">
          <Demobox code={basicCode}>
            <Basic />
          </Demobox>
        </Card>
        <Card title="Control Checkbox">
          <Demobox code={controlCode}>
            <Control />
          </Demobox>
        </Card>
        <Card title="Group Checkbox">
          <Demobox code={groupCode}>
            <Group />
          </Demobox>
        </Card>
        <PropsTable list={radioProps}/>
        <PropsTable list={groupProps} title="Group Props"/>
      </Flex>
    );
  }
}

export default CheckboxExample;