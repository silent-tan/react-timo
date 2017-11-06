import './_style.scss';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import forEach from 'lodash/forEach';
import isNil from 'lodash/isNil';
import find from 'lodash/find';
import map from 'lodash/map';
import isFunction from 'lodash/isFunction';
import assign from 'lodash/assign';
import constant from 'lodash/constant';

import SheetColumn from './SheetColumn';
import SheetAction from './SheetAction';
import SheetSelect from './SheetSelect';
import SheetBatchAction from './SheetBatchAction';

class Sheet extends React.Component {
  static propTypes = {
    /**
     * table data object array
     */
    list: PropTypes.array,
    /**
     * enable loading
     */
    loading: PropTypes.bool,
    /**
     * enable tip while no data
     */
    enableEmptyTip: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.element
    ]),
    /**
     * extra class name for table
     */
    className: PropTypes.string,
    getTrProps: PropTypes.func,
    /**
     * scrollX while overflow
     */
    scrollX: PropTypes.bool,
    /**
     * children
     */
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]).isRequired
  }
  static defaultProps = {
    list: [],
    loading: false,
    getTrProps: constant({}),
    scrollX: true
  }
  constructor(props) {
    super(props);
    this.dataProcessing = ::this.dataProcessing;
  }
  handleSelect(select, i, event) {
    select.props.onSelect(event.target.checked, i);
  }

  handleSelectAll(select, event) {
    select.props.onSelectAll(event.target.checked);
  }
  dataProcessing() {
    const list = this.props.list;
    const loading = this.props.loading;
    const enableEmptyTip = this.props.enableEmptyTip;
    const scrollX = this.props.scrollX;

    let select = false, isSelectAll = false, actions = false, batches = false;
    const columns = [];
    const others = [];
    const childrenIsArrayObject = toString.call(this.props.children) === '[object Array]';
    const children = childrenIsArrayObject ? this.props.children : [this.props.children];

    forEach(children, value => {
      if (!isNil(value)) {
        if (value.type.displayName === SheetColumn.displayName) {
          columns.push(value);
        } else if (value.type.displayName === SheetAction.displayName) {
          actions = value;
        } else if (value.type.displayName === SheetSelect.displayName) {
          select = value;
        }  else if (value.type.displayName === SheetBatchAction.displayName) {
          batches = value;
        } else {
          others.push(value);
        }
      }
    });

    if (select && list.length > 0) {
      // 存在有效行，且不存在未选中的行
      isSelectAll = find(list, value => !select.props.isDisabled(value))
      && !find(list, value => !select.props.isDisabled(value) && !value._nf_select);
    }
    return {
      list,
      loading,
      enableEmptyTip,
      scrollX,
      select,
      isSelectAll,
      columns,
      actions,
      batches,
      others
    };
  }

  render() {
    const {
      list,
      loading,
      enableEmptyTip,
      scrollX,
      select,
      batches,
      columns,
      actions,
      others,
      isSelectAll
    } = this.dataProcessing();

    return (
      <div className={cx("nf-sheet", this.props.className)}>
        {
          select && batches ?
            <div className="mb-2 text-right">
              {batches.props.children}
            </div>
            : null
        }
        <div className={`nf-sheet-table ${scrollX ? 'table-responsive': ''}`}>
          <table className="table table-hover table-bordered">
            <thead className="thead-default">
              <tr>
                {
                  select ?
                    <th className="nf-sheet-select">
                      <label className="custom-control custom-checkbox custom-checkbox--m0">
                        <input
                          className="custom-control-input"
                          type="checkbox"
                          checked={isSelectAll}
                          onChange={this.handleSelectAll.bind(this, select)}
                        />
                        <span className="custom-control-indicator"/>
                      </label>
                    </th>
                    : null
                }
                {
                  map(columns, (value, index) => {
                    const {
                      children, field, name, // eslint-disable-line
                      ...rest
                    } = value.props;
                    return (
                      <th key={index} {...rest}>{value.props.name}</th>
                    );
                  })
                }
                { actions ? <th className="text-center">操作</th> : null }
              </tr>
            </thead>
            <tbody>
              {
                loading ?
                  <tr>
                    <td colSpan="99" className="text-center">加载中...
                    </td>
                  </tr>
                  : null
              }
              {
                (!loading && enableEmptyTip && list.length === 0) ?
                  <tr>
                    <td colSpan="99" className="text-center">
                      { enableEmptyTip === true ? '没有数据' : enableEmptyTip }
                    </td>
                  </tr>
                  : null
              }
              {
                !loading ?
                  map(list, (value, index) => (
                    <tr {...this.props.getTrProps(index)} key={index}>
                      {
                        select ?
                          <td>
                            <label className="custom-control custom-checkbox custom-checkbox--m0">
                              <input
                                className="custom-control-input"
                                type="checkbox"
                                checked={value._nf_select || false}
                                onChange={this.handleSelect.bind(this, select, index)} disabled={select.props.isDisabled(value)}
                              />
                              <span className="custom-control-indicator"/>
                            </label>
                          </td>
                          : null
                      }
                      {
                        map(columns, (v, i) => {
                          const {
                            children, field, name, // eslint-disable-line
                            ...rest
                          } = v.props;
                          if (isFunction(children)) {
                            return <td key={i} {...rest}>{children(value[field], index)}</td>;
                          } else {
                            return <td key={i} {...rest}>{value[field]}</td>;
                          }
                        })
                      }
                      {
                        actions && isFunction(actions.props.children) ?
                          <td className="text-center">
                            {actions.props.children(value, index)}
                          </td>
                          : null
                      }
                    </tr>
                  )) : null
              }
            </tbody>
          </table>
        </div>
        {others}
      </div>
    );
  }
}

assign(Sheet, {
  SheetColumn,
  SheetAction,
  SheetSelect,
  SheetBatchAction
});

export default Sheet;