import React from 'react';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';
import _isFunction from 'lodash/isFunction';
import _noop from "lodash/noop";

class Clipboard extends React.PureComponent {
  static propTypes = {
    /**
     * 要复制的文本信息
     */
    text: PropTypes.string.isRequired,
    /**
     * 激活复制操作的子元素
     */
    children: PropTypes.element.isRequired,
    /**
     * 复制后的回调
     */
    onCopy: PropTypes.func,
    /**
     * 复制配置选项
     */
    options: PropTypes.shape({
      debug: PropTypes.bool,
      message: PropTypes.string
    })
  };


  static defaultProps = {
    onCopy: _noop
  };


  onClick = event => {
    const {
      text,
      onCopy,
      children,
      options
    } = this.props;

    const elem = React.Children.only(children);

    const result = copy(text, options);

    if (onCopy) {
      onCopy(text, result);
    }

    // Bypass onClick if it was present
    if (elem && elem.props && _isFunction(elem.props.onClick)) {
      elem.props.onClick(event);
    }
  };


  render() {
    const {
      text, onCopy, options,  // eslint-disable-line
      children,
      ...props
    } = this.props;
    const elem = React.Children.only(children);

    return React.cloneElement(elem, {...props, onClick: this.onClick});
  }
}

export default Clipboard;