import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Card, Grid, Collapse, Icon, Flex, Highlight} from 'react-timo';
const {Row, Col} = Grid;

class Demobox extends Component {
  static propTypes = {
    children: PropTypes.any,
    code: PropTypes.any
  }
  constructor(props) {
    super(props);
  }

  render() {
    const {children, code} = this.props;
    return (
      <Card title="Example" className="nf-demobox">
        <style>
          {
            `
              .nf-demobox-code pre {
                background-color: transparent;
                padding: 0;
              }
            `
          }
        </style>
        <Row>
          <Col span={12}>
            {children}
          </Col>
          <Col span={12} className="nf-demobox-code">
            <Collapse>
              <Collapse.Panel header={
                <Flex flex={1} justifyEnd>
                  Code Source&nbsp;&nbsp;&nbsp;&nbsp;<Icon type="unfold-more"/>
                </Flex>
              }>
                <Highlight>
                  {code}
                </Highlight>
              </Collapse.Panel>
            </Collapse>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Demobox;