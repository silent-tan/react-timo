import React, { Component } from 'react';
import {Grid} from 'react-timo';
const {Row, Col} = Grid;

class Demo extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Grid style={{background: '#f3f3f3'}}>
        <Row>
          <Col span={3} className="py-2 bg-red">Span 3</Col>
          <Col span={3} className="py-2 bg-blue">Span 3</Col>
          <Col span={3} className="py-2 bg-pink">Span 3</Col>
          <Col span={3} className="py-2 bg-white">Span 3</Col>
          <Col span={4} className="py-2 bg-cyan">Span 4</Col>
          <Col span={4} className="py-2 bg-purple">Span 4</Col>
          <Col span={4} className="py-2 bg-yellow">Span 4</Col>
        </Row>
        <Row>
          <Col span={3} />
          <Col span={9} className="py-2 bg-orange">Span 9, offset 3</Col>
          <Col span={9} className="py-2 bg-black">Span 9</Col>
          <Col span={9} className="py-2 bg-white">Span 9</Col>
        </Row>
      </Grid>
    );
  }
}

export default Demo;