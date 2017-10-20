import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/styles';

class Highlight extends Component {
  static propTypes = {
    children: PropTypes.any
  }

  render() {
    return(
      <SyntaxHighlighter language='javascript' style={tomorrow}>
        {this.props.children}
      </SyntaxHighlighter>
    );
  }
}

export default Highlight;