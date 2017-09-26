import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Row from './row';
import Col from './col';


class Grid extends Component {
  static Row = Row
  static Col = Col
  static propTypes = {
    fluid: PropTypes.bool,
    children: PropTypes.any,
    className: PropTypes.string,
    style: PropTypes.object
  }
  static defaultProps = {
    fluid: false,
    className: '',
    style: {}
  }
  constructor(props) {
    super(props);
  }

  render() {
    const {fluid, className, style} = this.props;
    const cls = cx({
      'container': !fluid,
      'container-fluid': fluid
    }, className);
    return (
      <div className={cls} style={style} />
    );
  }
}

export default Grid;