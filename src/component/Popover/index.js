import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _omit from 'lodash/omit';

import Tooltip from '../Tooltip';

/**
 * 弹出组件
 * @type {Component}
 * title 组件标题
 * content  组件内容 string/react element
 * 其他的props同Tooltip组件
 */
class Popover extends Component {
  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.any.isRequired
  }
  constructor(props) {
    super(props);
    this.getOverlay = ::this.getOverlay;
  }

  getOverlay() {
    const { title, content } = this.props;

    return (
      <div>
        {title && <div className="nf-popover-title">{title}</div>}
        <div className='nf-popover-inner-content'>
          {content}
        </div>
      </div>
    );
  }

  render() {
    return (
      <Tooltip
        {..._omit(this.props, ['title', 'content'])}
        content={this.getOverlay()}
      />
    );
  }
}

export default Popover;