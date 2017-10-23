import React, { Component } from 'react';
import { Flex, Card } from 'react-timo';

import {ExampleHeader, PropsTable, Demobox} from 'demo-component';
import './_style.scss';

import SearchSelectProps from '!!docgen-loader!../../../../src/component/SearchSelect';
import normalCode from '!!raw-loader!./NormalDemo';
import NormalDemo from './NormalDemo';

import selectionsCode from '!!raw-loader!./Selections';
import SelectionsDemo from './Selections';

class SearchSelectExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex className="demo-searchselect" column>
        <ExampleHeader
          title="SearchSelect Component"
          desc="SearchSelect links indicate a series of related content exists across multiple pages. Typically these are used where a multi-page approach to long lists of content improves general performance, such as in search results or inboxes"
        />
        <Card title="Basic SearchSelect">
          <Demobox code={normalCode}>
            <NormalDemo />
          </Demobox>
        </Card>
        <Card title="Custom Option template">
          <Demobox code={selectionsCode}>
            <SelectionsDemo />
          </Demobox>
        </Card>
        <PropsTable list={SearchSelectProps}/>
      </Flex>
    );
  }
}

export default SearchSelectExample;
