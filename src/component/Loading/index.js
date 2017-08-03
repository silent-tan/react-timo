import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './_style.scss';
class Loading extends Component {
  static propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg'])
  }
  static defaultProps = {
    size: 'md'
  }
  constructor(props) {
    super(props);
  }

  render() {
    const {size} = this.props;
    const sizeMap = {
      'sm': 30,
      'md': 40,
      'lg': 50
    };
    const viewBoxStr = `${sizeMap[size] / 2} ${sizeMap[size] / 2} ${sizeMap[size]} ${sizeMap[size]}`;
    return (
      <div className="nf-loading" style={{height: sizeMap[size], width: sizeMap[size]}}>
        <svg viewBox={viewBoxStr}>
          <circle
            cx={`${sizeMap[size]}`}
            cy={`${sizeMap[size]}`}
            r={`${sizeMap[size] / 5 * 2}`}
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