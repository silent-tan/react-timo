import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class PanelContent extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    isActive: PropTypes.bool,
    children: PropTypes.any,
    destroyInactivePanel: PropTypes.bool
  }
  shouldComponentUpdate(nextProps) {
    return this.props.isActive || nextProps.isActive;
  }

  render() {
    this._isActived = this._isActived || this.props.isActive;
    if (!this._isActived) {
      return null;
    }
    const { prefixCls, isActive, children, destroyInactivePanel } = this.props;
    const contentCls = classnames({
      [`${prefixCls}-content`]: true,
      [`${prefixCls}-content-active`]: isActive,
      [`${prefixCls}-content-inactive`]: !isActive
    });
    const child = !isActive && destroyInactivePanel ? null :
      <div className={`${prefixCls}-content-box`}>{children}</div>;
    return (
      <div
        className={contentCls}
        role="tabpanel"
      >{child}</div>
    );
  }
}

export default PanelContent;