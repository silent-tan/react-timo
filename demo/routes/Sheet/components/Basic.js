import React, { Component } from 'react';
import { Flex, Sheet } from 'react-timo';
const { SheetColumn } = Sheet;

import data from './data';

class Demo extends Component {
  render() {
    return (
      <Flex column>
        <Sheet list={data} enableEmptyTip={true}>
          <SheetColumn field="name" name="Name"/>
          <SheetColumn field="position" name="Position"/>
          <SheetColumn field="office" name="Office"/>
          <SheetColumn field="age" name="Age"/>
          <SheetColumn field="start_date" name="Start Day"/>
          <SheetColumn field="salary" name="Salary"/>
        </Sheet>
      </Flex>
    );
  }
}

export default Demo;