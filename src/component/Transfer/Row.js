import React, {Component} from 'react';
import PropTypes from 'prop-types';
class Row extends Component {
  constructor(props) {
    super(props);
    this.handleClick = ::this.handleClick;
  }
  handleClick() {
    const {data, onClick} = this.props;
    onClick(data);
  }
  render() {
    const {render, data, animated} = this.props;
    return (
      <div className={`nf-transfer-row animated ${animated}`} onClick={this.handleClick}>
        {render(data)}
      </div>
    );
  }
}
Row.propTypes = {
  animated: PropTypes.string,
  render: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};
Row.defaultProps = {
  animated: 'fadeIn'
};
export default Row;
