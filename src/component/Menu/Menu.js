import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RcMenu, {SubMenu, MenuItem, Divider, ItemGroup} from 'rc-menu';

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
    onDeselect: PropTypes.func
  }

  static defaultProps = {
    prefixCls: 'nf-menu',
    openTransition: 'zoom',
    style: {},
    justify: 'center',
    className: '',
    selectable: true,
    multiple: false
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {style, justify, ...restProps} = this.props;
    const styleTemp = {
      ...style
    };
    if(this.props.mode === 'horizontal') {
      styleTemp.justifyContent = justify;
    }
    return (
      <RcMenu {...restProps} style={styleTemp}/>
    );
  }
}

export default Menu;