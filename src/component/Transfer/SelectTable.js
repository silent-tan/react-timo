import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _map from 'lodash/map';

import Row from './Row';

class SelectTable extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    height: PropTypes.number.isRequired,
    render: PropTypes.func.isRequired,
    onClickItem: PropTypes.func.isRequired,
    animated: PropTypes.string
  }
  static defaultProps = {
    animated: 'fadeIn'
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {height, data, render, onClickItem, animated} = this.props;
    return (
      <div className="nf-transfer-table" style={{
        height: height
      }}>
        {
          _map(data, d => {
            return (
              <Row
                render={render}
                data={d}
                key={d._transfer_id}
                onClick={onClickItem}
                animated={animated}/>
            );
          })
        }
      </div>
    );
  }
}

export default SelectTable;
