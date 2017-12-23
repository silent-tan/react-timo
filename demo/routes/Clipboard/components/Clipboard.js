import React, { Component } from 'react';
import { Flex, Card } from 'react-timo';
import {ExampleHeader, PropsTable, Demobox, Method} from 'demo-component';

import clipboardProps from '!!docgen-loader!../../../../src/component/Clipboard';
import basicCode from '!!raw-loader!./Basic';
import Basic from './Basic';

class ClipboardExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex column className="demo-clipboard" flex={1}>
        <ExampleHeader
          title="Clipboard Component"
          desc={
            <div>
              Simple copy the string to your clipboard base on&nbsp;
              <a
                target="_blank"
                src="https://github.com/sudodoki/copy-to-clipboard"
                style={{color: '#03A9F4'}}
              >copy-to-clipboard</a>
            </div>
          }
        />
        <Card title="Basic Example">
          <Demobox code={basicCode}>
            <Basic />
          </Demobox>
        </Card>
        <PropsTable list={clipboardProps}/>
        <Method list={clipboardProps} />
      </Flex>
    );
  }
}

export default ClipboardExample;