import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Row from './row';
import Col from './col';


class Grid extends Component {
  static Row = Row
  static Col = Col
  static propTypes = {
    /**
     * 流式布局
     */
    fluid: PropTypes.bool,
    /**
     * 子组件
     */
    children: PropTypes.any,
    /**
     * 类名
     */
    className: PropTypes.string,
    /**
     * 内联样式
     */
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
    const {fluid, className, style, children} = this.props;
    const cls = cx({
      'container': !fluid,
      'container-fluid': fluid
    }, className);
    return (
      <div className={cls} style={style}>
        {children}
      </div>
    );
  }
}

export default Grid;