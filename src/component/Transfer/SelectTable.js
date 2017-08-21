import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import _map from 'lodash/map';
class SelectTable extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {height, data, render, onClickItem, animated} = this.props;
    return (
      <div className="__nf-transfer__table" style={{
        height: height
      }}>
        {_map(data, d => {
          return (
            <Row render={render} data={d} key={d._transfer_id} onClick={onClickItem} animated={animated}/>
          );
        })}
      </div>
    );
  }
}
SelectTable.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  render: PropTypes.func.isRequired,
  onClickItem: PropTypes.func.isRequired,
  animated: PropTypes.string
};
SelectTable.defaultProps = {
  animated: 'fadeIn'
};
export default SelectTable;
