import React, { Component } from 'react';
import { Flex, Card } from 'react-timo';

import {ExampleHeader, PropsTable, Demobox} from 'demo-component';

import collapseProps from '!!docgen-loader!../../../../src/component/Collapse';
import accordionDemoCode from '!!raw-loader!./AccordionDemo';
import AccordionDemo from './AccordionDemo';

import multiDemoCode from '!!raw-loader!./MultiDemo';
import MultiDemo from './MultiDemo';

class LoadingExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex className="demo-collapse" column>
        <ExampleHeader
          title="Collapse Component"
          desc="The Collapse component allows you to toggle content on your pages"
        />
        <Card title="Accordion Collapse" desc="Extend the default collapse behavior to create an accordion">
          <Demobox code={accordionDemoCode}>
            <AccordionDemo />
          </Demobox>
        </Card>
        <Card title="Multiple Collapse">
          <Demobox code={multiDemoCode}>
            <MultiDemo />
          </Demobox>
        </Card>
        <PropsTable list={collapseProps}/>
      </Flex>
    );
  }
}

export default LoadingExample;