/**
 * React component for flatpickr
 * 对flatpickr功能进行部分功能封装
 * 如果额外需要其他功能@farzer
 * date: 2017.06.26
 */

// d  Day of the month, 2 digits with leading zeros 01 to 31
// D  A textual representation of a day Mon through Sun
// l  (lowercase 'L')  A full textual representation of the day of the week  Sunday through Saturday
// j  Day of the month without leading zeros  1 to 31
// J  Day of the month without leading zeros and ordinal suffix 1st, 2nd, to 31st
// w  Numeric representation of the day of the week 0 (for Sunday) through 6 (for Saturday)
// F  A full textual representation of a month  January through December
// m  Numeric representation of a month, with leading zero  01 through 12
// n  Numeric representation of a month, without leading zeros  1 through 12
// M  A short textual representation of a month Jan through Dec
// U  The number of seconds since the Unix Epoch  1413704993
// y  A two digit representation of a year  99 or 03
// Y  A full numeric representation of a year, 4 digits 1999 or 2003
//

// H  Hours (24 hours)  00 to 23
// h  Hours 1 to 12
// i  Minutes 00 to 59
// S  Seconds, 2 digits 00 to 59
// s  Seconds 0, 1 to 59
// K  AM/PM AM or PM

// 不知道为什么不显示使用loader的时候无法使用配置loader进行编译
require('flatpickr/dist/flatpickr.css');
import './_style.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Flatpickr from 'flatpickr';
import moment from 'moment';
import uuid from 'uuid';

import trim from 'lodash/trim';
import noop from 'lodash/noop';
import isArray from 'lodash/isArray';
import isEqual from 'lodash/isEqual';
import forEach from 'lodash/forEach';

Flatpickr.localize(require('flatpickr/src/l10n/zh.js').zh);

class DateTimePicker extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,

    // 要显示的值
    value: (props, propName, componentName) => {
      const value = props[propName];
      // 只允许空或者可以检测测moment时间字符串
      const condition = trim(value) === '' || moment(value).isValid();
      if (!condition) {
        return new Error(
          'Invalid prop `' +
            propName +
            '` supplied to' +
            ' `' +
            componentName +
            '`. Validation failed.' +
            ' Pass an valiad date string'
        );
      }
    },
    // 是否显示时间
    enableTime: PropTypes.bool,

    // 最大日期或者最小日期
    maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
    minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),

    // 是否允许选择，如果不允许为false,或者允许某一些日期选择
    enable: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.arrayOf(PropTypes.string) // 只允许选择
    ]),

    // 当选或者多选，这影响返回的值是字符串还是字符串数组
    mode: PropTypes.oneOf(['single', 'multiple']),
    format: PropTypes.string,
    nextArrow: PropTypes.string,
    prevArrow: PropTypes.string
  }

  static defaultProps = {
    onClose: noop,
    onOpen: noop,
    onChange: noop,
    value: '',
    enableTime: false,
    maxDate: null,
    minDate: null,
    enable: true,
    mode: 'single',
    format: '',
    nextArrow: '<i class="zmdi zmdi-long-arrow-right"></i>',
    prevArrow: '<i class="zmdi zmdi-long-arrow-left"></i>'
  }

  constructor(props) {
    super(props);
    this.state = {
      timeKey: uuid.v1() + Math.random().toString().slice(3)
    };
  }

  componentDidMount() {
    const options = {
      onOpen: [this.props.onOpen],
      onClose: () => {
        this.node.blur && this.node.blur();
        this.props.onClose();
      },
      onChange: selectedDates => {
        if (selectedDates.length === 0) return;
        if (this.props.mode === 'single') {
          const value = moment(selectedDates[0]).toDate();
          this.props.onChange(value);
        } else {
          this.props.onChange(selectedDates);
        }
      },
      enableTime: this.props.enableTime,
      maxDate: this.props.maxDate,
      minDate: this.props.minDate,
      mode: this.props.mode,
      nextArrow: this.props.nextArrow,
      prevArrow: this.props.prevArrow,
      parseDate: dateString => moment(trim(dateString)).toDate(),
      locale: 'zh'
    };

    if (this.props.format) {
      options.dateFormat = this.props.format;
    }

    if (isArray(this.props.enable)) {
      options.enable = this.props.enable;
    }

    if (this.props.enable === false) {
      // 如果enable为false时，传递空数组给flatpickr
      options.enable = [];
    }

    this.flatpickr = new Flatpickr(this.node, options);
    if (trim(this.props.value) !== '') {
      this.flatpickr.setDate(this.props.value, false);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps, this.props)) {
      if (nextProps.value !== this.props.value) {
        this.flatpickr.setDate(nextProps.value, false);
      }
      // 重新传递flatpickr参数配置
      const options = {};

      if (nextProps.maxDate !== this.props.maxDate) {
        options.maxDate = nextProps.maxDate;
      }

      if (nextProps.minDate !== this.props.minDate) {
        options.minDate = nextProps.minDate;
      }

      if (trim(nextProps.value) === '') {
        this.flatpickr.clear();
        return;
      }

      forEach(options, (value, key) => {
        this.flatpickr.set(key, value);
      });
    }
  }

  componentWillUnmount() {
    this.flatpickr.destroy();
  }

  render() {
    return (
      <div key={this.state.timeKey} className="form-group">
        <input
          className="form-control datetime-picker flatpickr-input"
          defaultValue={this.props.value}
          ref={node => (this.node = node)}
        />
        <i className="form-group__bar" />
      </div>
    );
  }
}

export default DateTimePicker;
