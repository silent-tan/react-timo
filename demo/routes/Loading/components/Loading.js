import React, { Component } from 'react';
import { Flex, Card } from 'react-timo';

import {ExampleHeader, PropsTable, Demobox} from 'demo-component';

import loadingProps from '!!docgen-loader!../../../../src/component/Loading';
import normalCode from '!!raw-loader!./NormalDemo';
import NormalDemo from './NormalDemo';
import widthCode from '!!raw-loader!./WidthDemo';
import WidthDemo from './WidthDemo';

class LoadingExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex className="demo-loading" column>
        <ExampleHeader
          title="Icon Component"
          desc="Material Design Iconic Font is a full suite of official material design icons (created and maintained by Google), with additional community-designed icons and brands icons for easy scalable vector graphics on websites or desktop"
        />
        <Card title="Normal Example">
          <Demobox code={normalCode}>
            <NormalDemo />
          </Demobox>
        </Card>
        <Card title="Example with Width Props"  desc="Using custom size with width props.">
          <Demobox code={widthCode}>
            <WidthDemo />
          </Demobox>
        </Card>
        <PropsTable list={loadingProps}/>
      </Flex>
    );
  }
}

export default LoadingExample;