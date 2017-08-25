require('./_style.scss');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SelectTable from './SelectTable';
import Flex from '../Flex';
import uniqBy from 'lodash/uniqBy';
import remove from 'lodash/remove';

class Transfer extends Component {
  static propTypes = {
    height: PropTypes.number, // 高度
    title: PropTypes.array, // 右侧标题
    sourceData: PropTypes.array.isRequired, // 源数据
    targetData: PropTypes.array.isRequired, // 目标数据
    onChange: PropTypes.func.isRequired, // 回调函数，返回两个参数sourceData, targetData
    render: PropTypes.func // 渲染数据的显示内容
  }
  static defaultProps = {
    height: 300,
    title: [
      '源数据', '已选项'
    ],
    render: (item) => item._transfer_id + ' ' + item._transfer_value
  }
  constructor(props) {
    super(props);
    this.handleAllToTarget = ::this.handleAllToTarget;
    this.handleToTarget = ::this.handleToTarget;
    this.handleAllToSource = ::this.handleAllToSource;
    this.handleToSource = ::this.handleToSource;
  }
  handleToTarget(item) {
    const {sourceData, targetData, onChange} = this.props;
    const newSourceData = [...sourceData];
    const newTargetData = uniqBy([
      ...targetData,
      item
    ], '_transfer_id');
    remove(newSourceData, {_transfer_id: item._transfer_id});
    onChange(newSourceData, newTargetData);
  }
  handleToSource(item) {
    const {sourceData, targetData, onChange} = this.props;
    const newTargetData = [...targetData];
    const newSourceData = uniqBy([
      ...sourceData,
      item
    ], '_transfer_id');
    remove(newTargetData, {_transfer_id: item._transfer_id});
    onChange(newSourceData, newTargetData);
  }
  handleAllToTarget() {
    const {sourceData, targetData, onChange} = this.props;
    const newSourceData = [];
    const newTargetData = uniqBy([
      ...targetData,
      ...sourceData
    ], '_transfer_id');
    onChange(newSourceData, newTargetData);
  }
  handleAllToSource() {
    const {sourceData, targetData, onChange} = this.props;
    const newTargetData = [];
    const newSourceData = uniqBy([
      ...sourceData,
      ...targetData
    ], '_transfer_id');
    onChange(newSourceData, newTargetData);
  }
  render() {
    const {sourceData, targetData, height, title, render} = this.props;
    return (
      <div className="nf-transfer row">
        <div className="col-sm-6">
          <div className="card card-outline-info mb-0">
            <div className="p-2">
              <Flex justifyBetween alignCenter>
                <Flex className="lead">{title[0]}</Flex>
                <Flex>一共<span className="text-primary">{sourceData.length}</span>项</Flex>
              </Flex>
            </div>
            <button
              className="btn btn-block btn-info nf-transfer__button--corner waves-effect"
              onClick={this.handleAllToTarget}
            >
              <i className="zmdi zmdi-arrow-forward" />
            </button>
            <SelectTable
              data={sourceData}
              height={height}
              render={render}
              onClickItem={this.handleToTarget}
              animated="fadeInRight"
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card card-outline-info mb-0">
            <div className="p-2">
              <Flex justifyBetween alignCenter>
                <Flex className="lead">{title[1]}</Flex>
                <Flex>一共<span className="text-primary">{targetData.length}</span>项</Flex>
              </Flex>
            </div>
            <button
              className="btn btn-block btn-info nf-transfer__button--corner waves-effect"
              onClick={this.handleAllToSource}
            >
              <i className="zmdi zmdi-arrow-back" />
            </button>
            <SelectTable
              data={targetData}
              height={height}
              render={render}
              onClickItem={this.handleToSource}
              animated="fadeInLeft"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Transfer;
