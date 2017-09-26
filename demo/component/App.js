import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Flex} from 'react-timo';
import SideBar from './Sidebar';
import NavTop from './NavTop';
import './_style.scss';

class App extends Component {
  static propTypes = {
    children: PropTypes.any
  }
  render() {
    return (
      <div className="demo">
        <NavTop />
        <Flex className="demo-center container">
          <Flex className="mr-4" width="200px">
            <SideBar />
          </Flex>
          <Flex flex={1} className="demo-content">
            {this.props.children}
          </Flex>
        </Flex>
      </div>
    );
  }
}

export default App;