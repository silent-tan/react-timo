import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

class BreadcrumbItem extends Component {
  static propTypes = {
    href: PropTypes.string,
    separator: PropTypes.string,
    children: PropTypes.any
  }

  static defaultProps = {
    href: '#',
    separator: '/'
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { href, separator, children, ...restProps } = this.props;

    // render link
    let link;
    if (href !== '#') {
      link = (
        <Link
          to={href}
          className='nf-breadcrumb-item'
          {...restProps}
        >{children}</Link>
      );
    } else {
      link = (<span className='nf-breadcrumb-item' {...restProps}>{children}</span>);
    }

    return (
      <li>
        { link }
        <span className="nf-breadcrumb-separator mx-2">{separator}</span>
      </li>
    );
  }
}

export default BreadcrumbItem;