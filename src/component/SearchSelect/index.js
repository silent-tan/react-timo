/**
 * @Author: farzer
 * @Date:   2017-07-19 11:27:09
 * @Last modified by:   farzer
 * @Last modified time: 2017-07-19 11:41:58
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import $ from 'jquery';
import 'select2';

import _noop from 'lodash/noop';
import _keys from 'lodash/keys';
import _replace from 'lodash/replace';
import _isEqual from 'lodash/isEqual';

function formatOptions(options) {
  return options.__select__name;
}

function formatOptionsSelection(selected) {
  return selected.__select__name || selected.text;
}

class SearchSelect extends Component {
  static propTypes = {
    /**
     * onSearch必须返回一个promise对象，并且列表中数组信息包含{id: xxx, __select__name: xxx}
     * eg:
     * {
     *  searchList: [
     *    {id: xxx, __select__name: xxx, ...}, ... 
     *  ],
     *  offset,
     *  limit,
     *  count
     * }
     */
    onSearch: PropTypes.func.isRequired,
    /**
     * selected对象为{id: xxx, __select__name: xxx} 或者 {id: xxx, text: xxx}
     */
    selected: PropTypes.object,
    /**
     * 返回选择的数据
     */
    onSelect: PropTypes.func,
    /**
     * 搜索结果延迟多少秒
     */
    delay: PropTypes.number,
    /**
     * 禁止选择
     */
    disabled: PropTypes.bool,
    /**
     * 同select placeholder
     */
    placeholder: PropTypes.string,
    /**
     * 允许清空
     */
    allowClear: PropTypes.bool,
    /**
     * 返回一个 option 模板
     */
    templateResult: PropTypes.func,
    /**
     * 自定义onSelect回调返回的值
     */
    templateSelection: PropTypes.func,
    /**
     * 搜索结果渲染DOM在哪里
     */
    dropdownParent: PropTypes.any
  }

  static defaultProps = {
    selected: {},
    onSelect: _noop,
    delay: 300,
    disabled: false,
    placeholder: '输入关键字进行搜索',
    allowClear: true,
    templateResult: formatOptions,
    templateSelection: formatOptionsSelection 
  }

  constructor(props) {
    super(props);
    this.state = {
      idKey: uuid.v1()
    };
  }

  componentDidMount() {
    this.__SEARCHBOX = $(`#${this.state.idKey}`);
    this.__OPTIONS = {
      width: '100%',
      placeholder: this.props.placeholder,
      allowClear: this.props.allowClear,
      data: [this.props.selected],
      ajax: {
        dataType: 'json',
        delay: this.props.delay,
        transport: (params, success, failure) => {
          const page = params.data.page || 1;
          const offset = (page - 1) * 30;
          this.props.onSearch(params.data.term, offset).then((result) => {
            const resultTemp = {...result};
            if(resultTemp.searchList === undefined) {
              resultTemp.searchList = [];
              resultTemp.count = 0;
            }
            success(resultTemp);
          }, () => {
            failure();
          });
        },
        processResults: (data) => {
          return {
            results: data.searchList,
            pagination: {
              more: (data.offset + data.limit) < data.count
            }
          };
        }
      },
      escapeMarkup: markup => markup,
      minimumInputLength: 1,
      templateResult: (item) => {
        if(item.loading) { return '搜索中...'; }
        return this.props.templateResult(item);
      },
      templateSelection: (item) => {
        return this.props.templateSelection(item);
      },
      language: {
        inputTooShort: (params) => `至少输入${params.minimum}个字符`,
        noResults: () => `查询不到结果`,
        loadingMore: () => `载入更多结果中...`,
        errorLoading: () => `无法查询`
      }
    };

    if(_keys(this.props.selected).length) {
      this.__SEARCHBOX.empty();
    }

    if(this.props.dropdownParent) {
      this.__OPTIONS.dropdownParent = this.props.dropdownParent;
    } else {
      const selectWrap = this.selectRefs;
      this.__OPTIONS.dropdownParent = $(selectWrap).parent();
    }

    this.__SEARCHBOX.select2(this.__OPTIONS);

    this.__SEARCHBOX.on('select2:selecting', evt => {
      const data = evt.params.args.data;
      this.props.onSelect(data);
      this.__SEARCHBOX.select2('close');
      evt.preventDefault();
    });

    // 如果允许清除，则监听清除，并返回 {}
    if(this.props.allowClear) {
      this.__SEARCHBOX.on('change', () => {
        this.props.onSelect({});
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if(_isEqual(nextProps.selected, {}) && !_isEqual(this.props.selected, {})) {
      this.clearSelection();
      return;
    }
    if(!_isEqual(nextProps.selected, this.props.selected)) {
      const newOpt = {
        ...this.__OPTIONS,
        data: [nextProps.selected]
      };

      this.__SEARCHBOX.select2().empty();
      this.__SEARCHBOX.select2(newOpt);
    }
  }

  componentWillUnmount() {
    if(this.__SEARCHBOX) {
      const cls = _replace(this.__SEARCHBOX[0].className, ' ', '.');
      if($(`.${cls}`).length) {
        this.__SEARCHBOX.select2('destroy');
        // this.__SEARCHBOX.off('select2:select');
      }
    }
  }

  // 为组件附上加入ref,可通过this.xxx.clearSelection()进行调用，但不建议这种方式使用
  clearSelection() {
    this.__SEARCHBOX.val(null).trigger('change');
  }

  render() {
    return (
      <select
        className="select2 form-control"
        id={this.state.idKey}
        ref={selectRefs => this.selectRefs = selectRefs}
        disabled={this.props.disabled}
      >
        <option />
      </select>
    );
  }
}

export default SearchSelect;
