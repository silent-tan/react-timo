import React, { Component } from 'react';
import { Flex, Card } from 'react-timo';
import {ExampleHeader, PropsTable, Demobox} from 'demo-component';

import breadcrumbProps from '!!docgen-loader!../../../../src/component/Breadcrumb/Breadcrumb';
import basicCode from '!!raw-loader!./Basic';
import Basic from './Basic';

class BreadcrumbExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex column className="demo-breadcrumb" flex={1}>
        <ExampleHeader
          title="Breadcrumb Component"
          desc="Simple copy text to clipboard by copy-to-clipboard"
        />
        <Card title="Basic Example">
          <Demobox code={basicCode}>
            <Basic />
          </Demobox>
        </Card>
        <PropsTable list={breadcrumbProps}/>
      </Flex>
    );
  }
}

export default BreadcrumbExample;