import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import _noop from 'lodash/noop';

import * as Util from '../Util';
import Dialog from './Dialog';
import './_style.scss';

class DialogWrap extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    getContainer: PropTypes.func
  }

  static defaultProps = {
    visible: false,
    getContainer: Util.Element.getContainer
  }

  constructor(props) {
    super(props);
    this.getContainer = ::this.getContainer;
    this.getComponent = ::this.getComponent;
    this.removeContainer = ::this.removeContainer;
    this.renderComponent = ::this.renderComponent;
  }

  shouldComponentUpdate({visible}) {
    return !!(this.props.visible || visible);
  }

  componentDidMount() {
    this.renderComponent();
  }

  componentDidUpdate() {
    this.renderComponent();
  }

  componentWillUnmount() {
    if(this.props.visible) {
      this.renderComponent({
        afterClose: this.removeContainer,
        onClose: _noop,
        visible: false
      });
    } else {
      this.removeContainer();
    }
  }

  getContainer() {
    const {getContainer} = this.props;
    return getContainer();
  }

  getComponent(extra) {
    return (
      <Dialog {...this.props} {...extra} key="dialog"/>
    );
  }

  removeContainer() {
    if (this._container) {
      const container = this._container;
      ReactDOM.unmountComponentAtNode(container);
      container.parentNode.removeChild(container);
      this._container = null;
    }
  }

  renderComponent(extra={}) {
    // 如果已经挂载或者显示
    if (this._component || this.props.visible) {
      if (!this._container) {
        this._container = this.getContainer();
      }

      const component = this.getComponent(extra);

      ReactDOM.unstable_renderSubtreeIntoContainer(
        this,
        component,
        this._container,
        () => this._component = this
      );
    }
  }

  render() { return null; } // eslint-disable-line
}

export default DialogWrap;