import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _isString from 'lodash/isString';

class Card extends Component {
  static propTypes = {
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]).isRequired,
    animated: PropTypes.string,
    style: PropTypes.object
  }
  static defaultProps = {
    title: '',
    animated: 'fadeIn',
    style: {}
  }
  render() {
    const {title, children, animated, style} = this.props;
    return (
      <div className={`card animated${' ' + animated}`} style={style}>
        {
          title ?
            <div className="card-header">
              {
                _isString(title) ? <h2 className="card-title">{title}</h2> : {title}
              }
            </div> : null
        }
        <div className="card-block">
          {children}
        </div>
      </div>
    );
  }
}

export default Card;