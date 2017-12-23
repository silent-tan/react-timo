import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex, Breadcrumb } from 'react-timo';

class Demo extends Component {
  static propTypes = {
    routes: PropTypes.array
  }
  constructor(props) {
    super(props);
  }

  render() {
    const { routes } = this.props;
    return (
      <Flex>
        <Breadcrumb routes={routes} />
      </Flex>
    );
  }
}

export default Demo;