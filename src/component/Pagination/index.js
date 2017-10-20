import React from 'react';
import PropTypes from 'prop-types';
import Page from './Page';
import Options from './Options';
import { Keyboard } from '../Util';

import _isNumber from 'lodash/isNumber';
import _isUndefined from 'lodash/isUndefined';
import _isBoolean from 'lodash/isBoolean';
import _noop from 'lodash/noop';

import './_pagination.scss';

function isInteger(value) {
  return _isNumber(value) && isFinite(value) && Math.floor(value) === value;
}

function defaultItemRender(page, type, element) {
  return element;
}

const DEFAULT_PAGE_SIZE = 10;

export default class Pagination extends React.Component {
  static propTypes = {
    /**
     * 当前页码
     */
    current: PropTypes.number,
    /**
     * 默认页码
     */
    defaultCurrent: PropTypes.number,
    /**
     * 总数
     */
    total: PropTypes.number,
    /**
     * 每页多少数据
     */
    pageSize: PropTypes.number,
    /**
     * 简单数字显示
     */
    simple: PropTypes.bool,
    /**
     * 默认每页多少数据
     */
    defaultPageSize: PropTypes.number,
    /**
     * 更改页码回调
     */
    onChange: PropTypes.func,
    /**
     * 是否显示更改每页数据大小
     */
    showSizeChanger: PropTypes.bool,
    /**
     * 显示少的页码
     */
    showLessItems: PropTypes.bool,
    /**
     * 更改页码数据大小回调
     */
    onShowSizeChange: PropTypes.func,
    /**
     * 是否显示快速跳转页码功能
     */
    showQuickJumper: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object
    ]),
    /**
     * 用于显示数据总量和当前数据顺序
     */
    showTitle: PropTypes.bool,
    /**
     * 显示总数，返回一个显示的React Element
     */
    showTotal: PropTypes.func,
    /**
     * 组件额外内联样式
     */
    style: PropTypes.object,
    /**
     * 额外类名
     */
    className: PropTypes.string,
    /**
     * 额外类名
     */
    prefixCls: PropTypes.string,
    /**
     * Page的额外自定义渲染
     */
    itemRender: PropTypes.func,
    /**
     * 更改每页大小选择设置项
     */
    pageSizeOptions: PropTypes.arrayOf(PropTypes.string)
  };

  static defaultProps = {
    defaultCurrent: 1,
    total: 0,
    simple: false,
    defaultPageSize: DEFAULT_PAGE_SIZE,
    onChange: _noop,
    className: '',
    prefixCls: 'nf-pagination',
    showQuickJumper: false,
    showSizeChanger: false,
    showLessItems: false,
    showTitle: true,
    onShowSizeChange: _noop,
    style: {},
    itemRender: defaultItemRender
  };

  constructor(props) {
    super(props);

    const hasOnChange = props.onChange !== _noop;
    const hasCurrent = ('current' in props);
    if (hasCurrent && !hasOnChange) {
      console.warn('Warning: You provided a `current` prop to a Pagination component without an `onChange` handler. This will render a read-only component.'); // eslint-disable-line
    }

    let current = props.defaultCurrent;
    if ('current' in props) {
      current = props.current;
    }

    let pageSize = props.defaultPageSize;
    if ('pageSize' in props) {
      pageSize = props.pageSize;
    }

    this.state = {
      current,
      currentInputValue: current,
      pageSize
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('current' in nextProps) {
      this.setState({
        current: nextProps.current,
        currentInputValue: nextProps.current
      });
    }

    if ('pageSize' in nextProps) {
      const newState = {};
      let current = this.state.current;
      const newCurrent = this.calculatePage(nextProps.pageSize);
      current = current > newCurrent ? newCurrent : current;
      if (!('current' in nextProps)) {
        newState.current = current;
        newState.currentInputValue = current;
      }
      newState.pageSize = nextProps.pageSize;
      this.setState(newState);
    }
  }

  calculatePage = (p) => {
    let pageSize = p;
    if (_isUndefined(pageSize)) {
      pageSize = this.state.pageSize || DEFAULT_PAGE_SIZE;
    }
    return Math.floor((this.props.total - 1) / pageSize) + 1;
  }

  isValid = (page) => {
    return isInteger(page) && page >= 1 && page !== this.state.current;
  }

  handleKeyDown = (e) => {
    if (e.keyCode === Keyboard.KeyCode.UP || e.keyCode === Keyboard.KeyCode.DOWN) {
      e.preventDefault();
    }
  }

  handleKeyUp = (e) => {
    const inputValue = e.target.value;
    const currentInputValue = this.state.currentInputValue;
    let value;

    if (inputValue === '') {
      value = inputValue;
    } else if (isNaN(Number(inputValue))) {
      value = currentInputValue;
    } else {
      value = Number(inputValue);
    }

    if (value !== currentInputValue) {
      this.setState({
        currentInputValue: value
      });
    }

    if (e.keyCode === Keyboard.KeyCode.ENTER) {
      this.handleChange(value);
    } else if (e.keyCode === Keyboard.KeyCode.UP) {
      this.handleChange(value - 1);
    } else if (e.keyCode === Keyboard.KeyCode.DOWN) {
      this.handleChange(value + 1);
    }
  }

  changePageSize = (size) => {
    let current = this.state.current;
    const newCurrent = this.calculatePage(size);
    current = current > newCurrent ? newCurrent : current;
    if (_isNumber(size)) {
      if (!('pageSize' in this.props)) {
        this.setState({
          pageSize: size
        });
      }
      if (!('current' in this.props)) {
        this.setState({
          current,
          currentInputValue: current
        });
      }
    }
    this.props.onShowSizeChange(current, size);
  }

  handleChange = (p) => {
    let page = p;
    if (this.isValid(page)) {
      if (page > this.calculatePage()) {
        page = this.calculatePage();
      }

      if (!('current' in this.props)) {
        this.setState({
          current: page,
          currentInputValue: page
        });
      }

      const pageSize = this.state.pageSize || DEFAULT_PAGE_SIZE;
      this.props.onChange(page, pageSize);

      return page;
    }

    return this.state.current;
  }

  prev = () => {
    if (this.hasPrev()) {
      this.handleChange(this.state.current - 1);
    }
  }

  next = () => {
    if (this.hasNext()) {
      this.handleChange(this.state.current + 1);
    }
  }

  getJumpPrevPage() {
    return Math.max(1, this.state.current - (this.props.showLessItems ? 3 : 5));
  }

  getJumpNextPage() {
    return Math.min(this.calculatePage(), this.state.current + (this.props.showLessItems ? 3 : 5));
  }

  jumpPrev = () => {
    this.handleChange(this.getJumpPrevPage());
  }

  jumpNext = () => {
    this.handleChange(this.getJumpNextPage());
  }

  hasPrev = () => {
    return this.state.current > 1;
  }

  hasNext = () => {
    return this.state.current < this.calculatePage();
  }

  runIfEnter = (event, callback, ...restParams) => {
    if (event.key === 'Enter' || event.charCode === 13) {
      callback(...restParams);
    }
  }

  runIfEnterPrev = e => {
    this.runIfEnter(e, this.prev);
  }

  runIfEnterNext = e => {
    this.runIfEnter(e, this.next);
  }

  runIfEnterJumpPrev = e => {
    this.runIfEnter(e, this.jumpPrev);
  }

  runIfEnterJumpNext = e => {
    this.runIfEnter(e, this.jumpNext);
  }

  handleGoTO = e => {
    if (e.keyCode === Keyboard.KeyCode.ENTER || e.type === 'click') {
      this.handleChange(this.state.currentInputValue);
    }
  }

  render() {
    const props = this.props;

    const prefixCls = props.prefixCls;
    const allPages = this.calculatePage();
    const pagerList = [];
    let jumpPrev = null;
    let jumpNext = null;
    let firstPager = null;
    let lastPager = null;
    let gotoButton = null;

    const goButton = (props.showQuickJumper && props.showQuickJumper.goButton);
    const pageBufferSize = props.showLessItems ? 1 : 2;
    const { current, pageSize } = this.state;

    const prevPage = current - 1 > 0 ? current - 1 : 0;
    const nextPage = current + 1 < allPages ? current + 1 : allPages;

    if (props.simple) {
      if (goButton) {
        if (_isBoolean(goButton)) {
          gotoButton = (
            <li
              title={props.showTitle ? `跳至 ${this.state.current}/${allPages}` : null}
              className={`${prefixCls}-simple-pager`}
            >
              <button
                type="button"
                onClick={this.handleGoTO}
                onKeyUp={this.handleGoTO}
              >
                确认
              </button>
            </li>
          );
        } else {
          gotoButton = goButton;
        }
      }
      return (
        <ul className={`${prefixCls} ${prefixCls}-simple ${props.className}`} style={props.style}>
          <li
            title={props.showTitle ? '上一页' : null}
            onClick={this.prev}
            tabIndex="0"
            onKeyPress={this.runIfEnterPrev}
            className={`${this.hasPrev() ? '' : `${prefixCls}-disabled`} ${prefixCls}-prev`}
            aria-disabled={!this.hasPrev()}
          >
            {props.itemRender(prevPage, 'prev', <a className={`${prefixCls}-item-link`} />)}
          </li>
          <li
            title={props.showTitle ? `${this.state.current}/${allPages}` : null}
            className={`${prefixCls}-simple-pager`}
          >
            <input
              type="text"
              value={this.state.currentInputValue}
              onKeyDown={this.handleKeyDown}
              onKeyUp={this.handleKeyUp}
              onChange={this.handleKeyUp}
              size="3"
            />
            <span className={`${prefixCls}-slash`}>／</span>
            {allPages}
          </li>
          <li
            title={props.showTitle ? '下一页' : null}
            onClick={this.next}
            tabIndex="0"
            onKeyPress={this.runIfEnterNext}
            className={`${this.hasNext() ? '' : `${prefixCls}-disabled`} ${prefixCls}-next`}
            aria-disabled={!this.hasNext()}
          >
            {props.itemRender(nextPage, 'next', <a className={`${prefixCls}-item-link`} />)}
          </li>
          {gotoButton}
        </ul>
      );
    }

    if (allPages <= 5 + pageBufferSize * 2) {
      for (let i = 1; i <= allPages; i++) {
        const active = this.state.current === i;
        pagerList.push(
          <Page
            rootPrefixCls={prefixCls}
            onClick={this.handleChange}
            onKeyPress={this.runIfEnter}
            key={i}
            page={i}
            active={active}
            showTitle={props.showTitle}
            itemRender={props.itemRender}
          />
        );
      }
    } else {
      const prevItemTitle = props.showLessItems ? '向前3页' : '向前5页';
      const nextItemTitle = props.showLessItems ? '向后3页' : '向后5页';
      jumpPrev = (
        <li
          title={props.showTitle ? prevItemTitle : null}
          key="prev"
          onClick={this.jumpPrev}
          tabIndex="0"
          onKeyPress={this.runIfEnterJumpPrev}
          className={`${prefixCls}-jump-prev`}
        >
          {props.itemRender(
            this.getJumpPrevPage(), 'jump-prev', <a className={`${prefixCls}-item-link`} />
          )}
        </li>
      );
      jumpNext = (
        <li
          title={props.showTitle ? nextItemTitle : null}
          key="next"
          tabIndex="0"
          onClick={this.jumpNext}
          onKeyPress={this.runIfEnterJumpNext}
          className={`${prefixCls}-jump-next`}
        >
          {props.itemRender(
            this.getJumpNextPage(), 'jump-next', <a className={`${prefixCls}-item-link`} />
          )}
        </li>
      );
      lastPager = (
        <Page
          last
          rootPrefixCls={prefixCls}
          onClick={this.handleChange}
          onKeyPress={this.runIfEnter}
          key={allPages}
          page={allPages}
          active={false}
          showTitle={props.showTitle}
          itemRender={props.itemRender}
        />
      );
      firstPager = (
        <Page
          rootPrefixCls={prefixCls}
          onClick={this.handleChange}
          onKeyPress={this.runIfEnter}
          key={1}
          page={1}
          active={false}
          showTitle={props.showTitle}
          itemRender={props.itemRender}
        />
      );

      let left = Math.max(1, current - pageBufferSize);
      let right = Math.min(current + pageBufferSize, allPages);

      if (current - 1 <= pageBufferSize) {
        right = 1 + pageBufferSize * 2;
      }

      if (allPages - current <= pageBufferSize) {
        left = allPages - pageBufferSize * 2;
      }

      for (let i = left; i <= right; i++) {
        const active = current === i;
        pagerList.push(
          <Page
            rootPrefixCls={prefixCls}
            onClick={this.handleChange}
            onKeyPress={this.runIfEnter}
            key={i}
            page={i}
            active={active}
            showTitle={props.showTitle}
            itemRender={props.itemRender}
          />
        );
      }

      if (current - 1 >= pageBufferSize * 2 && current !== 1 + 2) {
        pagerList[0] = React.cloneElement(pagerList[0], {
          className: `${prefixCls}-item-after-jump-prev`
        });
        pagerList.unshift(jumpPrev);
      }
      if (allPages - current >= pageBufferSize * 2 && current !== allPages - 2) {
        pagerList[pagerList.length - 1] = React.cloneElement(pagerList[pagerList.length - 1], {
          className: `${prefixCls}-item-before-jump-next`
        });
        pagerList.push(jumpNext);
      }

      if (left !== 1) {
        pagerList.unshift(firstPager);
      }
      if (right !== allPages) {
        pagerList.push(lastPager);
      }
    }

    let totalText = null;

    if (props.showTotal) {
      totalText = (
        <li className={`${prefixCls}-total-text`}>
          {props.showTotal(
            props.total,
            [
              (current - 1) * pageSize + 1,
              current * pageSize > props.total ? props.total : current * pageSize
            ]
          )}
        </li>
      );
    }
    const prevDisabled = !this.hasPrev();
    const nextDisabled = !this.hasNext();
    return (
      <ul
        className={`${prefixCls} ${props.className}`}
        style={props.style}
        unselectable="unselectable"
      >
        {totalText}
        <li
          title={props.showTitle ? '上一页' : null}
          onClick={this.prev}
          tabIndex="0"
          onKeyPress={this.runIfEnterPrev}
          className={`${!prevDisabled ? '' : `${prefixCls}-disabled`} ${prefixCls}-prev`}
          aria-disabled={prevDisabled}
        >
          {props.itemRender(prevPage, 'prev', <a className={`${prefixCls}-item-link`} />)}
        </li>
        {pagerList}
        <li
          title={props.showTitle ? '下一页' : null}
          onClick={this.next}
          tabIndex="0"
          onKeyPress={this.runIfEnterNext}
          className={`${!nextDisabled ? '' : `${prefixCls}-disabled`} ${prefixCls}-next`}
          aria-disabled={nextDisabled}
        >
          {props.itemRender(nextPage, 'next', <a className={`${prefixCls}-item-link`} />)}
        </li>
        <Options
          locale={props.locale}
          rootPrefixCls={prefixCls}
          selectPrefixCls={props.selectPrefixCls}
          changeSize={this.props.showSizeChanger ? this.changePageSize : null}
          current={this.state.current}
          pageSize={this.state.pageSize}
          quickGo={this.props.showQuickJumper ? this.handleChange : null}
          goButton={goButton}
          pageSizeOptions={this.props.pageSizeOptions}
        />
      </ul>
    );
  }
}