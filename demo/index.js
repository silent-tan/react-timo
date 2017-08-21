import './index.scss';
import 'markdown-it-react-loader/index.css';
import 'highlight.js/styles/default.css';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {Flex} from '../src/';
import {Router, Route, hashHistory, IndexRedirect} from 'react-router';
import Demo from './component/demo';

class App extends React.Component {
  static propTypes = {
    children: PropTypes.any
  }
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="demo">
        <Flex className="demo-center container">
          <Flex>
            {this.props.children}
          </Flex>
        </Flex>
      </div>
    );
  }
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/demo" />
      <Route path="/demo" component={Demo}/>
    </Route>
  </Router>
), window.document.getElementById('appContainer'));
