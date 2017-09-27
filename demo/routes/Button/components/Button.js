import React, { Component } from 'react';
import { Flex, Card } from 'react-timo';
import {ExampleHeader, PropsTable, Demobox} from 'demo-component';

import buttonProps from '!!docgen-loader!../../../../src/component/Button';
import basicCode from '!!raw-loader!./Basic';
import Basic from './Basic';

import outlineCode from '!!raw-loader!./Outline';
import Outline from './Outline';

import iconCode from '!!raw-loader!./Icon';
import IconDemo from './Icon';

class IconExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex column className="demo-button">
        <ExampleHeader
          title="Button Component"
          desc="Use Bootstrap’s custom button styles for actions in forms, dialogs, and more. Includes support for a handful of contextual variations, sizes, states, and more."
        />
        <Card title="Basic Example" desc="Bootstrap includes six predefined button styles, each serving its own semantic purpose">
          <Demobox code={basicCode}>
            <Basic />
          </Demobox>
        </Card>
        <Card title="Outline Button" desc="In need of a button, but not the hefty background colors they bring? Replace the default modifier classes with the .btn-outline-* ones to remove all background images and colors on any button">
          <Demobox code={outlineCode}>
            <Outline/>
          </Demobox>
        </Card>
        <Card title="Icon Button" desc="You can refer the Icons page for the complete list of Font Icons which are inspired by Material Design">
          <Demobox code={iconCode}>
            <IconDemo/>
          </Demobox>
        </Card>
        <PropsTable list={buttonProps}/>
      </Flex>
    );
  }
}

export default IconExample;