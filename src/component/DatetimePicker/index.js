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

import 'flatpickr/dist/flatpickr.css';
import './_datetimepicker.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Flatpickr from 'flatpickr';
import moment from 'moment';
import uuid from 'uuid';

import _trim from 'lodash/trim';
import _noop from 'lodash/noop';
import _isArray from 'lodash/isArray';
import _isEqual from 'lodash/isEqual';
import _forEach from 'lodash/forEach';

import ZH from 'flatpickr/dist/l10n/zh';

class DateTimePicker extends Component {
  static propTypes = {
    /**
     * 改变时间回调
     */
    onChange: PropTypes.func,
    /**
     * 时间选择器打开回调
     */
    onOpen: PropTypes.func,
    /**
     * 时间选择器关闭回调
     */
    onClose: PropTypes.func,
    /**
     * 要显示的值
     */ 
    value: (props, propName, componentName) => {
      const value = props[propName];
      // 只允许空或者可以检测测moment时间字符串
      const condition = _trim(value) === '' || moment(value).isValid();
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
    /**
     * 是否显示时间
     */
    enableTime: PropTypes.bool,
    /**
     * 最大日期
     */
    maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
    /**
     * 最小日期
     */
    minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
    /**
     * 是否允许选择，如果不允许为false,或者允许某一些日期选择
     */ 
    enable: PropTypes.oneOfType([ PropTypes.bool, PropTypes.arrayOf(PropTypes.string) ]),
    /**
     * 当选或者多选，这影响返回的值是字符串还是字符串数组
     */
    mode: PropTypes.oneOf(['single', 'multiple']),
    /**
     * 时间日期格式
     */
    format: PropTypes.string,
    /**
     * 日期选择前箭头
     */
    nextArrow: PropTypes.string,
    /**
     * 日期选择后箭头
     */
    prevArrow: PropTypes.string,
    /**
     * 时间24小时
     */
    time24: PropTypes.bool,
    /**
     * 关闭手机原生
     */
    disableMobile: PropTypes.bool
  }

  static defaultProps = {
    onClose: _noop,
    onOpen: _noop,
    onChange: _noop,
    value: '',
    enableTime: false,
    maxDate: null,
    minDate: null,
    enable: true,
    mode: 'single',
    format: '',
    nextArrow: '<i class="zmdi zmdi-long-arrow-right"></i>',
    prevArrow: '<i class="zmdi zmdi-long-arrow-left"></i>',
    time24: true,
    disableMobile: true
  }

  constructor(props) {
    super(props);
    this.state = {
      timeKey: uuid.v1() + Math.random().toString().slice(3),
      disabled: false
    };
  }

  componentDidMount() {
    const options = {
      locale: ZH.zh,
      onOpen: [this.props.onOpen],
      onClose: () => {
        this.node.blur && this.node.blur();
        this.props.onClose();
      },
      onChange: (selectedDates, dateStr, instance) => {
        if (selectedDates.length === 0) return;
        if (this.props.mode === 'single') {
          const value = moment(selectedDates[0]).toDate();
          this.props.onChange(value, dateStr, instance);
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
      time_24hr: this.props.time24,
      disableMobile: this.props.disableMobile,
      parseDate: dateString => moment(_trim(dateString)).toDate()
    };

    if (this.props.format) {
      options.dateFormat = this.props.format;
    }

    if (_isArray(this.props.enable)) {
      options.enable = this.props.enable;
    }

    if (this.props.enable === false) {
      // 如果enable为false时，传递空数组给flatpickr
      options.enable = [];
      this.setState({
        disabled: true
      });
    }

    this.flatpickr = new Flatpickr(this.node, options);
    if (_trim(this.props.value) !== '') {
      this.flatpickr.setDate(this.props.value, false);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!_isEqual(nextProps, this.props)) {
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

      if (_trim(nextProps.value) === '') {
        this.flatpickr.clear();
        return;
      }

      _forEach(options, (value, key) => {
        this.flatpickr.set(key, value);
      });
    }
  }

  componentWillUnmount() {
    this.flatpickr.destroy();
  }

  render() {
    return (
      <div key={this.state.timeKey} className="form-group nf-datetime-picker">
        <input
          className="form-control datetime-picker flatpickr-input nf-datetime-picker-input"
          defaultValue={this.props.value}
          ref={node => (this.node = node)}
          placeholder="选择时间"
          disabled={this.state.disabled}
        />
        <i className="form-group__bar" />
      </div>
    );
  }
}

export default DateTimePicker;
