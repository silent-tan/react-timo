import React from 'react';
import PropTypes from 'prop-types';
import { Keyboard } from '../Util';
import Flex from '../Flex';
import Select from '../Select';

import _isBoolean from 'lodash/isBoolean';
import _map from 'lodash/map';

class Options extends React.Component {
  static propTypes = {
    changeSize: PropTypes.func,
    quickGo: PropTypes.func,
    selectComponentClass: PropTypes.func,
    current: PropTypes.number,
    pageSize: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf([''])
    ]),
    buildOptionText: PropTypes.func,
    pageSizeOptions: PropTypes.arrayOf(PropTypes.string),
    locale: PropTypes.object
  }

  static defaultProps = {
    pageSizeOptions: ['10', '20', '30', '40']
  }

  constructor(props) {
    super(props);

    this.state = {
      current: props.current,
      goInputText: ''
    };
  }

  buildOptionText = (value) => {
    return `${value} ${this.props.locale.items_per_page}`;
  }

  changeSize = (value) => {
    this.props.changeSize(Number(value));
  }

  handleChange = (e) => {
    this.setState({
      goInputText: e.target.value
    });
  }

  go = (e) => {
    let val = this.state.goInputText;
    if (val === '') {
      return;
    }
    val = Number(val);
    if (isNaN(val)) {
      val = this.state.current;
    }
    if (e.keyCode === Keyboard.KeyCode.ENTER || e.type === 'click') {
      this.setState({
        goInputText: '',
        current: this.props.quickGo(val)
      });
    }
  }

  render() {
    const props = this.props;
    const state = this.state;
    const prefixCls = `${props.rootPrefixCls}-options`;
    const changeSize = props.changeSize;
    const quickGo = props.quickGo;
    const goButton = props.goButton;
    let changeSelect = null;
    let goInput = null;
    let gotoButton = null;

    if (!(changeSize || quickGo)) {
      return null;
    }

    if (changeSize) {
      const pageSize = props.pageSize || props.pageSizeOptions[0];
      const options = _map(props.pageSizeOptions, (value, i) => {
        return {
          value,
          name: `每页${value}项`
        };
      });

      changeSelect = (
        <Select
          options={options}
          selected={pageSize}
          onChange={this.changeSize}
        />
      );
    }

    if (quickGo) {
      if (goButton) {
        if (_isBoolean(goButton)) {
          gotoButton = (
            <button
              type="button"
              onClick={this.go}
              onKeyUp={this.go}
            >
              确认
            </button>
          );
        } else {
          gotoButton = goButton;
        }
      }
      goInput = (
        <div className={`${prefixCls}-quick-jumper`}>
          <Flex>
            <Flex className="mr-1">跳至</Flex>
            <Flex>
              <div className="form-group mb-0">
                <input
                  type="text"
                  className="form-control input-mask"
                  value={state.goInputText}
                  onChange={this.handleChange}
                  onKeyUp={this.go}
                />
                <i className="form-group__bar" />
              </div>
            </Flex>
            <Flex className="ml-1">页</Flex>
          </Flex>
          {gotoButton}
        </div>
      );
    }

    return (
      <li className={`${prefixCls}`}>
        {changeSelect}
        {goInput}
      </li>
    );
  }
}

export default Options;