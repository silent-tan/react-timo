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

class Test extends React.Component {
  render() {
    return (
      <div>Test</div>
    );
  }
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App} breadcrumbName="首页">
      <IndexRedirect to="/demo" />
      <Route path="/demo" component={Demo} breadcrumbName="例子"/>
      <Route path="/test" component={Test} />
    </Route>
  </Router>
), window.document.getElementById('appContainer'));
