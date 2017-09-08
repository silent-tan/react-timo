import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import Flex from '../Flex';

class NextArrow extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
    vertical: PropTypes.bool
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {className, style, onClick, vertical} = this.props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'flex'
        }}
        onClick={onClick}
      >
        <Flex className="nf-slick-arrow-next" justifyCenter alignCenter>
          {
            !vertical
              ? <Icon type="long-arrow-right"/>
              : <Icon type="long-arrow-down" />
          }
        </Flex>
      </div>
    );
  }
}

export default NextArrow;