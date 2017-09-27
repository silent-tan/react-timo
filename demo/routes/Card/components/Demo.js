import React, { Component } from 'react';
import {Flex, Card} from 'react-timo';

class Demo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex className="p-4" column style={{background: '#f3f3f3'}}>
        <Card title="Card title" desc="Praesent commodo cursus magna scelerisque consectetur.">
          Nullam id dolor id nibh ultricies vehicula ut id elit. Nulla vitae elit libero, a pharetra augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper. Donec sed odio dui.
        </Card>
      </Flex>
    );
  }
}

export default Demo;