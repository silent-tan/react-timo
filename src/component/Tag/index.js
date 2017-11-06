import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Animate from 'rc-animate';
import classNames from 'classnames';
import Icon from '../Icon';
import CheckableTag from './CheckableTag';

import _noop from 'lodash/noop';
import _omit from 'lodash/omit';

import './_tag.scss';

class Tag extends Component {
  static CheckableTag = CheckableTag;
  static propTypes = {
    /**
     * business prefix
     */
    prefixCls: PropTypes.string,
    /**
     * extra class name
     */
    className: PropTypes.string,
    /**
     * color
     */
    color: PropTypes.string,
    /**
     * enable closable
     */
    closable: PropTypes.bool,
    /**
     * close callback
     */
    onClose: PropTypes.func,
    /**
     * extra style
     */
    style: PropTypes.object,
    /**
     * children
     */
    children: PropTypes.any
  }
  static defaultProps = {
    prefixCls: 'nf-tag',
    closable: false,
    className: '',
    onClose: _noop,
    style: {}
  };

  constructor(props) {
    super(props);

    this.handleClose = ::this.handleClose;
    this.animationEnd = ::this.animationEnd;

    this.state = {
      closing: false,
      closed: false
    };
  }

  handleClose(e) {
    const onClose = this.props.onClose;
    if (onClose) {
      onClose(e);
    }

    if (e.defaultPrevented) {
      return;
    }

    const dom = ReactDOM.findDOMNode(this); // eslint-disable-line
    dom.style.width = `${dom.getBoundingClientRect().width}px`;

    this.setState({
      closing: true
    });
  }

  animationEnd(_, existed) {
    if (!existed && !this.state.closed) {
      this.setState({
        closed: true,
        closing: false
      });
    }
  }

  static isPresetColor(color) {
    if (!color) { return false; }
    return /^(pink|red|yellow|orange|cyan|green|blue|purple)(-inverse)?$/.test(color);
  }

  render() {
    const { prefixCls, closable, color, className, children, style, ...otherProps } = this.props;
    const closeIcon = closable ? <Icon type="close" onClick={this.handleClose} /> : '';
    const isPresetColor = Tag.isPresetColor(color);

    const classString = classNames(prefixCls, {
      [`${prefixCls}-${color}`]: isPresetColor,
      [`${prefixCls}-has-color`]: (color && !isPresetColor),
      [`${prefixCls}-close`]: this.state.closing
    }, className);

    const divProps = _omit(otherProps, [ 'onClose' ]);
    const tagStyle = {
      backgroundColor: (color && !isPresetColor) ? color : null,
      ...style
    };
    const tag = this.state.closed ? null : (
      <div
        data-show={!this.state.closing}
        {...divProps}
        className={classString}
        style={tagStyle}
      >
        <span className={`${prefixCls}-text`}>{children}</span>
        {closeIcon}
      </div>
    );
    return (
      <Animate
        component=""
        showProp="data-show"
        transitionName={`${prefixCls}-zoom`}
        transitionAppear
        onEnd={this.animationEnd}
      >
        {tag}
      </Animate>
    );
  }
}

export default Tag;