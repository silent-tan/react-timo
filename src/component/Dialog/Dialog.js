import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import Animate from 'rc-animate';

import _noop from 'lodash/noop';
import _assign from 'lodash/assign';
import _isNil from 'lodash/isNil';

import LazyRenderBox from './LazyRenderBox';
import Icon from '../Icon';
import * as Util from '../Util';

let openCount = 0;

class Dialog extends Component {
  static propTypes = {
    height: PropTypes.any,
    width: PropTypes.any,
    title: PropTypes.any,
    closable: PropTypes.any,
    bodyStyle: PropTypes.object,
    bodyProps: PropTypes.object,
    style: PropTypes.object,
    footer: PropTypes.any,
    afterClose: PropTypes.func,
    className: PropTypes.string,
    mask: PropTypes.bool,
    visible: PropTypes.bool,
    keyboard: PropTypes.bool,
    maskClosable: PropTypes.bool,
    onClose: PropTypes.func,
    wrapClassName: PropTypes.string,
    wrapProps: PropTypes.object,
    maskProps: PropTypes.object,
    zIndex: PropTypes.any,
    wrapStyle: PropTypes.object,
    maskStyle: PropTypes.object,
    maskTransitionName: PropTypes.string,
    maskAnimation: PropTypes.any,
    transitionName: PropTypes.string,
    animation: PropTypes.any,
    mousePosition: PropTypes.any,
    children: PropTypes.any
  }

  static defaultProps = {
    afterClose: _noop,
    className: '',
    mask: true,
    visible: false,
    keyboard: true,
    maskClosable: true,
    onClose: _noop,
    wrapClassName: '',
    wrapProps: {},
    maskProps: {},
    wrapStyle: {},
    maskStyle: {}
  }

  constructor(props) {
    super(props);
    this.close = ::this.close;
    this.onMaskClick = ::this.onMaskClick;
    this.onKeyDown = ::this.onKeyDown;
    this.onAnimateLeave = ::this.onAnimateLeave;
    this.addScrollingEffect = ::this.addScrollingEffect;
    this.removeScrollingEffect = ::this.removeScrollingEffect;
    this.checkScrollbar = ::this.checkScrollbar;
    this.resetScrollbar = ::this.resetScrollbar;
    this.setScrollbar = ::this.setScrollbar;
    this.getZIndexStyle = ::this.getZIndexStyle;
    this.getWrapStyle = ::this.getWrapStyle;
    this.getMaskStyle = ::this.getMaskStyle;
    this.getMaskTransitionName = ::this.getMaskTransitionName;
    this.getTransitionName = ::this.getTransitionName;
    this.getElement = ::this.getElement;
    this.getMaskElement = ::this.getMaskElement;
    this.getDialogElement = ::this.getDialogElement;
  }

  componentWillMount() {
    this.inTransition = false;
    this.titleId = `dialogTitle${uuid.v1()}`;
  }

  componentDidMount() {
    this.componentDidUpdate({});
  }

  componentDidUpdate(prevProps) {
    const thisProps = this.props;
    const {mousePosition, visible, mask} = thisProps;
    if(visible) {
      if(!prevProps.visible) {
        this.openTime = Date.now();
        this.lastOutSideFocusNode = window.document.activeElement;
        this.addScrollingEffect();
        this.refsWrap.focus();
        const dialogNode = ReactDOM.findDOMNode(this.refsDialog); // eslint-disable-line
        if(mousePosition) {
          const elOffset = Util.Layout.offset(dialogNode);
          Util.Layout.setTransformOrigin(
            dialogNode,
            `${mousePosition.x - elOffset.left}px ${mousePosition.y - elOffset.top}px`
          );
        } else {
          Util.Layout.setTransformOrigin(dialogNode, '');
        }
      }
    } else {
      this.inTransition = true;
      if(mask && this.lastOutSideFocusNode) {
        try {
          this.lastOutSideFocusNode.focus();
        } catch (e) {
          this.lastOutSideFocusNode = null;
        }
        this.lastOutSideFocusNode = null;
      }
    }
  }

  componentWillUnmount() {
    const {visible} = this.props;
    if(visible || this.inTransition) {
      this.removeScrollingEffect();
    }
  }

  close(e) {
    const {onClose} = this.props;
    onClose(e);
  }

  onMaskClick(e) {
    if (Date.now() - this.openTime < 300) {
      return;
    }
    if (e.target === e.currentTarget) {
      this.close(e);
    }
  }

  onKeyDown(e) {
    const props = this.props;
    if (props.keyboard && e.keyCode === Util.Keyboard.KeyCode.ESC) {
      this.close(e);
    }
    // keep focus inside dialog
    if (props.visible) {
      if (e.keyCode === Util.Keyboard.KeyCode.TAB) {
        const activeElement = window.document.activeElement;
        const dialogRoot = this.refsWrap;
        const sentinel = this.refsSentinel;
        if (e.shiftKey) {
          if (activeElement === dialogRoot) {
            sentinel.focus();
          }
        } else if (activeElement === this.refsSentinel) {
          dialogRoot.focus();
        }
      }
    }
  }

  onAnimateLeave() {
    if(this.refsWrap) {
      this.refsWrap.style.display = 'none';
    }
    this.inTransition = false;
    this.removeScrollingEffect();
    this.props.afterClose();
  }

  addScrollingEffect() {
    openCount++;
    if(openCount !== 1) return;
    this.checkScrollbar();
    this.setScrollbar();
    window.document.body.style.overflow = 'hidden';
  }

  removeScrollingEffect() {
    openCount--;
    if(openCount !== 0) return;
    window.document.body.style.overflow = '';
    this.resetScrollbar();
  }

  checkScrollbar() {
    let fullWindowWidth = window.innerWidth;
    if(!fullWindowWidth) {
      const documentElementRect = window.document.documentElement.getBoundingClientRect();
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
    }
    this.bodyIsOverflowing = window.document.clientWidth < fullWindowWidth;
    if(this.bodyIsOverflowing) this.scrollbarWidth = Util.Layout.getScrollbarSize();
  }

  resetScrollbar() {
    window.document.body.style.paddingRight = '';
  }

  setScrollbar() {
    if (this.bodyIsOverflowing && this.scrollbarWidth !== undefined) {
      window.document.body.style.paddingRight = `${this.scrollbarWidth}px`;
    }
  }

  getZIndexStyle() {
    const style = {};
    const {zIndex} = this.props;
    if(zIndex !== undefined) {
      style.zIndex = zIndex;
    }
    return style;
  }

  getWrapStyle() {
    return _assign({}, this.getZIndexStyle(), this.props.wrapStyle);
  }

  getMaskStyle() {
    return _assign({}, this.getZIndexStyle(), this.props.maskStyle);
  }

  getMaskTransitionName() {
    let {maskTransitionName: transitionName} = this.props;
    const {maskAnimation: animation} = this.props;
    if(!transitionName && animation) {
      transitionName = `nf-dialog-animation`;
    }
    return transitionName;
  }

  getTransitionName() {
    let {transitionName} = this.props;
    const {animation} = this.props;
    if(!transitionName && animation) {
      transitionName = `nf-dialog-animation`;
    }
    return transitionName;
  }

  getElement(refsNode) {
    return this[refsNode];
  }

  getMaskElement() {
    const {mask, visible, maskProps} = this.props;
    let maskElement;
    if(mask) {
      const maskTransition = this.getMaskTransitionName();
      maskElement = (
        <LazyRenderBox
          style={this.getMaskStyle()}
          key="mask"
          className="nf-dialog-mask"
          hiddenClassName="nf-dialog-mask-hidden"
          visible={visible}
          {...maskProps}
        />
      );
      if(maskTransition) {
        maskElement = (
          <Animate
            key="mask"
            showProps="visible"
            transitionAppear
            component=""
            transitionName={maskTransition}
          >
            {maskElement}
          </Animate>
        );
      }
    }
    return maskElement;
  }

  getDialogElement() {
    const {
      height,
      width,
      closable,
      title,
      className,
      visible,
      bodyStyle,
      bodyProps,
      children
    } = this.props;
    const dest = {};
    if(!_isNil(height)) dest.height = height;
    if(!_isNil(width)) dest.width = width;

    let header;
    if(title) {
      header = (
        <div className="nf-dialog-header" ref={refsNode => this.refsHeader = refsNode}>
          <div className="nf-dialog-title" id={this.titleId}>
            {title}
          </div>
        </div>
      );
    }

    let closer;
    if(closable) {
      closer = (
        <button
          onClick={this.close}
          className="nf-dialog-close"
        >
          <Icon type="close-circle-o" />
        </button>
      );
    }

    let footer;
    if(this.props.footer) {
      footer = (
        <div className="nf-dialog-footer" ref={refsNode => this.refsFooter = refsNode}>
          {this.props.footer}
        </div>
      );
    }

    const style = _assign({}, this.props.style, dest);
    const transitionName = this.getTransitionName();
    const dialogElement = (
      <LazyRenderBox
        key="dialog-element"
        ref={refsNode => this.refsDialog = refsNode}
        style={style}
        visible={visible}
        className={className}
      >
        <div className="nf-dialog-content">
          {closer}
          {header}
          <div
            className="nf-dialog-body"
            style={bodyStyle}
            ref={refsNode => this.refsBody = refsNode}
            {...bodyProps}
          >
            {children}
          </div>
          {footer}
        </div>
        <div
          tabIndex={0}
          ref={refsNode => this.refsSentinel = refsNode}
          style={{ width: 0, height: 0, overflow: 'hidden' }}
        >
          sentinel
        </div>
      </LazyRenderBox>
    );

    return (
      <Animate
        key="dialog"
        showProps="visible"
        onLeave={this.onAnimateLeave}
        transitionName={transitionName}
        component=""
        transitionAppear
      >
        {dialogElement}
      </Animate>
    );
  }

  render() {
    const {maskClosable, visible, wrapClassName, wrapProps} = this.props;
    const style = this.getWrapStyle();
    if(visible) {
      style.display = null;
    }
    return (
      <div>
        {this.getMaskElement()}
        <div
          tabIndex={-1}
          onKeyDown={this.onKeyDown}
          className={wrapClassName}
          ref={refsNode => this.refsWrap = refsNode}
          onClick={maskClosable ? this.onMaskClick : undefined}
          style={style}
          {...wrapProps}
        >
          {this.getDialogElement()}
        </div>
      </div>
    );
  }
}

export default Dialog;