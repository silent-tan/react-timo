import React, { Component } from 'react';
import {Flex, Grid} from 'react-timo';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.handleChange = ::this.handleChange;
    this.state = {
      activeKey: '1'
    };
  }

  handleChange(activeKey) {
    this.setState({
      activeKey
    });
  }

  render() {
    return (
      <Flex className="p-4" column style={{background: '#f3f3f3'}}>
        <Grid className="bg-white p-2">
          This is the normal Grid
        </Grid>
        <div className="mb-2"/>
        <Grid fluid className="bg-white p-2">
          This is the fluid Grid
        </Grid>
      </Flex>
    );
  }
}

export default Demo;