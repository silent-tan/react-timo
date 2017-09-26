import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './_style.scss';
class Loading extends Component {
  static propTypes = {
    /**
     * Loading 大小
     */
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    /**
     * 具体大小
     */
    width: PropTypes.number,
    /**
     * Loading类名
     */
    className: PropTypes.string,
    /**
     * 额外内联样式
     */
    style: PropTypes.object
  }
  static defaultProps = {
    size: 'md',
    width: 0,
    className: '',
    style: {}
  }
  constructor(props) {
    super(props);
  }

  render() {
    const {size, width, style, className} = this.props;
    const sizeMap = {
      'sm': 30,
      'md': 40,
      'lg': 50
    };
    let value = sizeMap[size];
    if(width) value = width;
    const viewBoxStr = `${value / 2} ${value / 2} ${value} ${value}`;
    const cls = cx('nf-loading', className);
    return (
      <div className={cls} style={{height: value, width: value, ...style}}>
        <svg viewBox={viewBoxStr}>
          <circle
            cx={`${value}`}
            cy={`${value}`}
            r={`${value / 5 * 2}`}
            fill="none"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
        </svg>
      </div>
    );
  }
}

export default Loading;