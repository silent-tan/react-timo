import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Grid, Collapse, Icon, Flex, Highlight} from 'react-timo';
const {Row, Col} = Grid;

import _includes from 'lodash/includes';

class Demobox extends Component {
  static propTypes = {
    children: PropTypes.any,
    code: PropTypes.any
  }
  constructor(props) {
    super(props);
    this.state = {
      showCopy: false,
      copySuccess: false
    };
  }

  handleCopy(e) {
    e.stopPropagation();
    this.setState({
      copySuccess: true
    });
  }

  handleChange(activeKey) {
    const showCopy = _includes(activeKey, 'code');
    const newState = {
      showCopy
    };
    if(!showCopy) newState.copySuccess = false;
    this.setState(newState);
  }

  render() {
    const {children, code} = this.props;
    return (
      <Row>
        <Col span={12}>
          {children}
        </Col>
        <Col span={12} className="nf-demobox-code">
          <Collapse onChange={this.handleChange.bind(this)}>
            <Collapse.Panel key="code"
              header={
                <Flex flex={1} justifyEnd>
                  {
                    this.state.copySuccess && this.state.showCopy
                      ? <small className="text-success mr-3"> Copied success! </small>
                      : null
                  }
                  {
                    this.state.showCopy ?
                      <Flex className="nf-demobox-copy">
                        <Icon type="copy" onClick={this.handleCopy.bind(this)}/>
                      </Flex> : null
                  }
                  <Flex>
                    Code Source&nbsp;&nbsp;&nbsp;&nbsp;<Icon type="unfold-more"/>
                  </Flex>
                </Flex>
              }
            >
              <Highlight>
                {code}
              </Highlight>
            </Collapse.Panel>
          </Collapse>
        </Col>
      </Row>
    );
  }
}

export default Demobox;