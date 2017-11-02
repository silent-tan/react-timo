import React, { Component } from 'react';
import { Flex, Card } from 'react-timo';
import {ExampleHeader, PropsTable, Demobox} from 'demo-component';

import datetimePickerProps from '!!docgen-loader!../../../../src/component/DatetimePicker';
import basicCode from '!!raw-loader!./Basic';
import Basic from './Basic';

class ClipboardExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex column className="demo-datetime-picker" flex={1}>
        <ExampleHeader
          title="DatetimePicker Component"
          desc="a component base on flatpickr.js"
        />
        <Card title="Basic Example">
          <Demobox code={basicCode}>
            <Basic />
          </Demobox>
        </Card>
        <PropsTable list={datetimePickerProps}/>
      </Flex>
    );
  }
}

export default ClipboardExample;