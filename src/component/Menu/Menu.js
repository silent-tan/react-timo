import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RcMenu from 'rc-menu';

// 方便以后扩展 TODO
import Divider from './Divider';
import ItemGroup from './ItemGroup';
import SubMenu from './SubMenu';
import MenuItem from './MenuItem';

class Menu extends Component {
  static Divider = Divider;
  static ItemGroup = ItemGroup;
  static SubMenu = SubMenu;
  static MenuItem = MenuItem;

  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    openTransition: PropTypes.string,
    mode: PropTypes.oneOf(['horizontal', 'vertical', 'inline']),
    style: PropTypes.object,
    justify: PropTypes.oneOf(['start', 'center', 'end']),
    defaultActiveFirst: PropTypes.bool,
    activeKey: PropTypes.object,
    multiple: PropTypes.bool,
    selectable: PropTypes.bool,
    selectedKeys: PropTypes.arrayOf(PropTypes.string),
    defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string),
    openKeys: PropTypes.arrayOf(PropTypes.string),
    defaultOpenKeys: PropTypes.arrayOf(PropTypes.string),
    onSelect: PropTypes.func,
    onClick: PropTypes.func,
    onOpenChange: PropTypes.func,
    onDeselect: PropTypes.func,
    shadow: PropTypes.bool
  }

  static defaultProps = {
    prefixCls: 'nf-menu',
    openTransition: 'zoom',
    style: {},
    justify: 'start',
    className: '',
    selectable: true,
    multiple: false,
    mode: 'horizontal',
    shadow: false
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {style, shadow, justify, ...restProps} = this.props;
    const temp = {};
    if(this.props.mode === 'horizontal') {
      temp.justifyContent = justify;
      if(justify === 'end') temp.justifyContent = 'flex-end';
    }
    if(!shadow) {
      temp.boxShadow = 'none';
    }
    const styleTemp = {
      ...temp,
      ...style
    };
    return (
      <RcMenu {...restProps} style={styleTemp}/>
    );
  }
}

export default Menu;