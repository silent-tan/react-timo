import React, { Component } from 'react';
import { Flex, Card } from 'react-timo';
import {ExampleHeader, PropsTable, Demobox} from 'demo-component';

import modalProps from '!!docgen-loader!../../../../src/component/Modal/Modal';
import basicCode from '!!raw-loader!./Basic';
import Basic from './Basic';

class ModalExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex column className="demo-modal" flex={1}>
        <ExampleHeader
          title="Modal Component"
          desc="Modals are streamlined, but flexible, dialog prompts with the minimum required functionality and smart defaults."
        />
        <Card title="Basic Example">
          <Demobox code={basicCode}>
            <Basic />
          </Demobox>
        </Card>
        <PropsTable list={modalProps}/>
      </Flex>
    );
  }
}

export default ModalExample;