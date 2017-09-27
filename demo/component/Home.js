import React, { Component } from 'react';
import {Flex} from 'react-timo';
import NavTop from './NavTop';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="demo">
        <NavTop />
        <Flex className="demo-center container">
          Welcome to Timo
        </Flex>
      </div>
    );
  }
}

export default Home;