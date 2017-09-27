import React, { Component } from 'react';
import { Flex, Card } from 'react-timo';
import {ExampleHeader, PropsTable, Demobox} from 'demo-component';

import cardProps from '!!docgen-loader!../../../../src/component/Card';
import code from '!!raw-loader!./Demo';
import Demo from './Demo';

import typeDemoCode from '!!raw-loader!./TypeDemo';
import TypeDemo from './TypeDemo';

import outlineDemoCode from '!!raw-loader!./OutlineDemo';
import OutlineDemo from './OutlineDemo';

class CardExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex column className="demo-card">
        <ExampleHeader
          title="Card Component"
          desc="Below is an example of a basic card with mixed content and a fixed width. Cards have no fixed width to start, so they’ll naturally fill the full width of its parent element"
        />
        <Card title="Basic Card">
          <Demobox code={code}>
            <Demo />
          </Demobox>
        </Card>
        <Card title="Type Card" desc="Card include their own variant classes for quickly changing the background-color and border-color of a card. Darker colors require the use of .card-inverse invert the text colors.">
          <Demobox code={typeDemoCode}>
            <TypeDemo />
          </Demobox>
        </Card>
        <Card title="Outline Card" desc="In need of a colored card, but not the hefty background colors they bring? Replace the default modifier classes with the .card-outline-* ones to style just the border-color of a card.">
          <Demobox code={outlineDemoCode}>
            <OutlineDemo />
          </Demobox>
        </Card>
        <PropsTable list={cardProps}/>
      </Flex>
    );
  }
}

export default CardExample;