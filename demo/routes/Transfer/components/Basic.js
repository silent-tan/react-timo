import React, { PureComponent } from 'react';
import { Flex, Transfer } from 'react-timo';

class Demo extends PureComponent {
  state = {
    sourceData: [{
      _transfer_id: 1,
      _transfer_value: '测试1'
    }],
    targetData: []
  }
  componentDidMount() {
    const sourceData = this.getTransferMockData();
    this.setState({
      ...this.state,
      sourceData
    });
  }
  getTransferMockData() {
    const sourceData = [];
    for (let i = 0; i < 10; i++) {
      sourceData.push({
        _transfer_id: i,
        _transfer_value: `transfer mock ${Math.random()}`
      });
    }

    return sourceData;
  }
  handleChangeTransfer(sourceData, targetData) {
    this.setState({
      sourceData, targetData
    });
  }
  render() {
    return (
      <Flex>
        <Transfer
          sourceData={this.state.sourceData}
          targetData={this.state.targetData}
          onChange={this.handleChangeTransfer.bind(this)}
        />
      </Flex>
    );
  }
}

export default Demo;