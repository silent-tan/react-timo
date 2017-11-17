import React, { Component } from 'react';
import { Flex, Card } from 'react-timo';

import {ExampleHeader, PropsTable, Demobox} from 'demo-component';

import PaginationProps from '!!docgen-loader!../../../../src/component/Pagination';
import normalCode from '!!raw-loader!./NormalDemo';
import NormalDemo from './NormalDemo';

import jumpToPageCode from '!!raw-loader!./JumpToPage';
import JumpToPage from './JumpToPage';

import simpleDemoCode from '!!raw-loader!./SimpleDemo';
import SimpleDemo from './SimpleDemo';

import showTotalCode from '!!raw-loader!./ShowTotal';
import ShowTotal from './ShowTotal';

import pageSizeCode from '!!raw-loader!./PageSize';
import PageSize from './PageSize';

import completeCode from '!!raw-loader!./Complete';
import Complete from './Complete';

class PaginationExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex className="demo-pagination" column>
        <ExampleHeader
          title="Pagination Component"
          desc="Pagination links indicate a series of related content exists across multiple pages. Typically these are used where a multi-page approach to long lists of content improves general performance, such as in search results or inboxes"
        />
        <Card title="Basic Pagination">
          <Demobox code={normalCode}>
            <NormalDemo />
          </Demobox>
        </Card>
        <Card title="Jump to Page">
          <Demobox code={jumpToPageCode}>
            <JumpToPage />
          </Demobox> 
        </Card>
        <Card title="Jump to Page">
          <Demobox code={simpleDemoCode}>
            <SimpleDemo />
          </Demobox> 
        </Card>
        <Card title="Show Total">
          <Demobox code={showTotalCode}>
            <ShowTotal />
          </Demobox> 
        </Card>
        <Card title="Page size change">
          <Demobox code={pageSizeCode}>
            <PageSize />
          </Demobox> 
        </Card>
        <Card title="A complete demo">
          <Demobox code={completeCode}>
            <Complete />
          </Demobox> 
        </Card>
        <PropsTable list={PaginationProps}/>
      </Flex>
    );
  }
}

export default PaginationExample;