import React, { Component } from 'react';
import { Flex, Card } from 'react-timo';
import {ExampleHeader, PropsTable, Demobox} from 'demo-component';

import tagProps from '!!docgen-loader!../../../../src/component/Tag';
import basicCode from '!!raw-loader!./Basic';
import Basic from './Basic';

class TagExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex column className="demo-tag" flex={1}>
        <ExampleHeader
          title="Tag Component"
          desc="Add quick, dynamic tab functionality to transition through panes of local content,"
        />
        <Card title="Basic Example">
          <Demobox code={basicCode}>
            <Basic />
          </Demobox>
        </Card>
        <PropsTable list={tagProps}/>
      </Flex>
    );
  }
}

export default TagExample;