import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Flex} from '../../src/index';
import SideBar from './Sidebar';
import Demo from './demo';

class App extends Component {
  static propTypes = {
    children: PropTypes.any
  }
  render() {
    return (
      <div className="demo">
        <Flex className="demo-center container">
          <Flex className="mr-4" width="200px">
            <SideBar />
          </Flex>
          <Flex flex={1}>
            {this.props.children}
            <Flex>
              <Demo />
            </Flex>
          </Flex>
        </Flex>
      </div>
    );
  }
}

export default App;