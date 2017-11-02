import React, { Component } from 'react';
import { Flex, Card } from 'react-timo';
import {ExampleHeader, PropsTable, Demobox} from 'demo-component';

import dropdownProps from '!!docgen-loader!../../../../src/component/Dropdown/Dropdown';
import basicCode from '!!raw-loader!./Basic';
import Basic from './Basic';

class ClipboardExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex column className="demo-dropdown" flex={1}>
        <ExampleHeader
          title="Dropdown Component"
          desc="Dropdowns are toggleable, contextual overlays for displaying lists of links and more. They’re made interactive with the included dropdown directives."
        />
        <Card title="Basic Example">
          <Demobox code={basicCode}>
            <Basic />
          </Demobox>
        </Card>
        <PropsTable list={dropdownProps}/>
      </Flex>
    );
  }
}

export default ClipboardExample;