import './index.scss';
import 'markdown-it-react-loader/index.css';
import 'highlight.js/styles/default.css';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {Flex as TimoFlex} from '../src/index';
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
        <TimoFlex className="demo-center container">
          <TimoFlex>
            {this.props.children}
          </TimoFlex>
        </TimoFlex>
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
