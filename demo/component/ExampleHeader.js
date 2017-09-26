import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Flex} from 'react-timo';

class ExampleHeader extends Component {
  static propTypes = {
    title: PropTypes.any,
    desc: PropTypes.any
  }
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex column className="demo-header">
        <Flex className="demo-title"> {this.props.title} </Flex>
        <Flex className="demo-desc">
          {this.props.desc}
        </Flex>
      </Flex>
    );
  }
}

export default ExampleHeader;