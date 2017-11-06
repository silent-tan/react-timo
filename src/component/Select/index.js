import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import uuid from 'uuid';
import 'select2';
import 'select2/dist/css/select2.css';

import _map from 'lodash/map';
import _noop from 'lodash/noop';
import _isNil from 'lodash/isNil';

import './_select.scss';

export default class Select extends Component {
  static propTypes = {
    /**
     * control selected
     */
    selected: PropTypes.any,
    /**
     * option config
     */
    options: PropTypes.array,
    /**
     * selected callback
     */
    onChange: PropTypes.func,
    /**
     * multiple
     */
    multiple: PropTypes.oneOf(['multiple', false]),
    /**
     * disabled search the option
     */
    disabledSearch: PropTypes.bool,
    /**
     * disabled select
     */
    disabled: PropTypes.bool
  }
  static defaultProps = {
    selected: undefined,
    options: [],
    onChange: _noop,
    multiple: false,
    disabledSearch: false,
    disabled: false
  }
  constructor(props) {
    super(props);
    this.state = {
      multiple: props.multiple,
      selected: props.selected || props.options[0].value,
      cid: uuid.v1()
    };
  }
  componentDidMount() {
    const $el = $(`#${this.state.cid}`);
    // https://github.com/select2/select2/issues/3278
    this.__config = {
      width: '100%'
    };
    if(this.props.disabledSearch) {
      this.__config.minimumResultsForSearch = Infinity;
    }
    $el.select2(this.__config);
    $el.on("select2:select", (e) => {
      this.setState({
        selected: e.target.value
      }, () => {
        $el.select2(this.__config);
      });
      this.props.onChange && this.props.onChange(e.params.data.id, e.params.data.text);
    });
  }

  componentWillReceiveProps(nextProps) {
    // why
    // https://stackoverflow.com/questions/17957040/reset-select2-value-and-show-placeholder
    if(!_isNil(nextProps.selected) && nextProps.selected !== this.state.selected) {
      const $el = $(`#${this.state.cid}`);
      this.setState({
        selected: nextProps.selected
      }, () => {
        $el.val('' + nextProps.selected).trigger('change');
      });
    }
  }
  renderOptionItem() {
    const {options} = this.props;
    return _map(options, (item) => {
      return (
        <option value={item.value} key={`tabs${item.value}`}>{item.name}</option>
      );
    });
  }
  render() {
    return (
      <select
        className="select2-single form-control"
        id={this.state.cid}
        defaultValue={this.state.selected}
        disabled={this.props.disabled}
        multiple={this.state.multiple}
      >
        {this.renderOptionItem()}
      </select>
    );
  }
}