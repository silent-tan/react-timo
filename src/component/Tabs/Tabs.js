import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import RcTabs from 'rc-tabs';
import cx from 'classnames';

import _includes from 'lodash/includes';
import _isObject from 'lodash/isObject';
import _isNil from 'lodash/isNil';
import _has from 'lodash/has';

import TabPane from './TabPane';
import ScrollableInkTabBar from './ScrollableInkTabBar';
import TabContent from './TabContent';
import Icon from '../Icon';
import * as Util from '../Util';

const {isFlexSupported} = Util.Browser;

class Tabs extends Component {
  static TabPane = TabPane

  static propTypes = {
    defaultActiveKey: PropTypes.string,
    activeKey: PropTypes.string,
    size: PropTypes.oneOf(['default', 'small']),
    type: PropTypes.oneOf(['line', 'card', 'editable-card']),
    tabPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    onEdit: PropTypes.func,
    onChange: PropTypes.func,
    prefixCls: PropTypes.string,
    hideAdd: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.any,
    tabBarStyle: PropTypes.object,
    onTabClick: PropTypes.func,
    onPrevClick: PropTypes.func,
    onNextClick: PropTypes.func,
    animated: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        inkBar: PropTypes.bool,
        tabPane: PropTypes.bool
      })
    ]),
    tabBarExtraContent: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.oneOf([null])
    ])
  }
  static defaultProps = {
    prefixCls: 'nf-tabs',
    hideAdd: false,
    className: '',
    type: 'line',
    size: 'default',
    tabPosition: 'top',
    animated: true
  };

  constructor(props) {
    super(props);
    this.handleChange = ::this.handleChange;
    this.createNewTab = ::this.createNewTab;
    this.removeTab = ::this.removeTab;
  }

  componentDidMount() {
    const NO_FLEX = ' no-flex';
    const tabNode = findDOMNode(this);
    if (tabNode && !isFlexSupported() && _includes(tabNode.className, NO_FLEX)) {
      tabNode.className += NO_FLEX;
    }
  }

  handleChange(activeKey) {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(activeKey);
    }
  }

  createNewTab(targetKey) {
    const onEdit = this.props.onEdit;
    if (onEdit) {
      onEdit(targetKey, 'add');
    }
  }

  removeTab(targetKey, e) {
    e.stopPropagation();
    if (!targetKey) {
      return;
    }

    const onEdit = this.props.onEdit;
    if (onEdit) {
      onEdit(targetKey, 'remove');
    }
  }

  render() {
    const {
      prefixCls,
      className,
      size,
      type,
      tabPosition,
      children,
      tabBarStyle,
      hideAdd,
      onTabClick,
      onPrevClick,
      onNextClick,
      animated
    } = this.props;

    let {tabBarExtraContent} = this.props;

    const inkBarAnimated = _isObject(animated) ? animated.inkBar : animated;
    let tabPaneAnimated = _isObject(animated) ? animated.tabPane : animated;

    // card tabs should not have animation
    if (type !== 'line') {
      tabPaneAnimated = _has(this.props, 'animated') ? tabPaneAnimated : false;
    }

    if((_includes(type,'card') || _includes(type, 'editable-card')) && size === 'small') {
      console.error(
        'Tabs[type=card|editable-card] doesn\'t have small size, it\'s by designed.'
      );
    }
    const cls = cx(className, {
      [`${prefixCls}-mini`]: size === 'small' || size === 'mini',
      [`${prefixCls}-vertical`]: tabPosition === 'left' || tabPosition === 'right',
      [`${prefixCls}-card`]: _includes(type, 'card'),
      [`${prefixCls}-${type}`]: true,
      [`${prefixCls}-no-animation`]: !tabPaneAnimated
    });
    // only card type tabs can be added and closed
    let childrenWithClose;
    if (type === 'editable-card') {
      childrenWithClose = [];
      React.Children.forEach(children, (child, index) => {  // eslint-disable-line
        let closable = child.props.closable;
        closable = _isNil(closable) ? true : closable;
        const closeIcon = closable ? (
          <Icon
            type="close"
            onClick={e => this.removeTab(child.key, e)}
          />
        ) : null;
        childrenWithClose.push(cloneElement(child, {
          tab: (
            <div className={closable ? undefined : `${prefixCls}-tab-unclosable`}>
              {child.props.tab}
              {closeIcon}
            </div>
          ),
          key: child.key || index
        }));
      });
      // Add new tab handler
      if (!hideAdd) {
        tabBarExtraContent = (
          <span>
            <Icon type="plus" className={`${prefixCls}-new-tab`} onClick={this.createNewTab} />
            {tabBarExtraContent}
          </span>
        );
      }
    }

    tabBarExtraContent = tabBarExtraContent ? (
      <div className={`${prefixCls}-extra-content`}>
        {tabBarExtraContent}
      </div>
    ) : null;

    const renderTabBar = () => (
      <ScrollableInkTabBar
        inkBarAnimated={inkBarAnimated}
        extraContent={tabBarExtraContent}
        onTabClick={onTabClick}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        style={tabBarStyle}
      />
    );

    return (
      <RcTabs
        {...this.props}
        className={cls}
        tabBarPosition={tabPosition}
        renderTabBar={renderTabBar}
        renderTabContent={() => <TabContent animated={tabPaneAnimated} animatedWithMargin />}
        onChange={this.handleChange}
      >
        {childrenWithClose || children}
      </RcTabs>
    );
  }
}

export default Tabs;