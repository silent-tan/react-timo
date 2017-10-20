import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _map from 'lodash/map';
import _includes from 'lodash/includes';

import {Card, Sheet, Tag, Popover} from 'react-timo';
import ObjectView from './ObjectView';

class PropsTable extends Component {
  static propTypes = {
    title: PropTypes.string,
    list: PropTypes.any
  }
  static defaultProps = {
    title: 'Props'
  }

  constructor(props) {
    super(props);
  }

  renderType(type) {
    if (type) {
      const { name, value } = type;
      if (value !== undefined) {
        let tempName = name;
        if(tempName === 'enum') tempName = 'oneOf';
        if(tempName === 'union') tempName = 'oneOfType';
        return (
          <Popover
            placement="right"
            trigger="click"
            content={
              <ObjectView object={value}/>
            }
          >
            <Tag color="blue">{tempName}</Tag>
          </Popover>
        );
      } else {
        return (
          <Tag style={{ cursor: 'default' }}>{name}</Tag>
        );
      }
    }

    return null;
  }

  renderRequired(required) {
    return required === 'true'
      ? <span className="text-danger">{required}</span> : required;
  }

  renderValue(list, valueObj, i) {
    if (valueObj === undefined || valueObj.value === '_noop') {
      return '-';
    }
    if (_includes(['object', 'shape'], list[i].propTypes.name)) {
      return (
        <Popover
          trigger="click"
          placement="right"
          content={
            <ObjectView object={valueObj}/>
          }
        >
          <Tag color="blue">object</Tag>
        </Popover>
      );
    }
    return valueObj.value;
  }

  render() {
    const propsTemp = this.props.list[0].props;
    const list = _map(propsTemp, (value, key) => {
      return {
        propName: key,
        propTypes: value.type,
        isRequired: value.required !== undefined ? value.required.toString() : 'false',
        comment: value.description,
        default: value.defaultValue
      };
    });
    return (
      <Card title={this.props.title}>
        <style>
          {
            `
              .nf-popover-inner-content > pre {
                padding: 0;
              }
            `
          }
        </style>
        <div className="row">
          <div className="col-sm-12">
            <Sheet list={list}>
              <Sheet.SheetColumn field="propName" name="Props Name"/>
              <Sheet.SheetColumn field="propTypes" name="PropTypes">
                { this.renderType.bind(this) }
              </Sheet.SheetColumn>
              <Sheet.SheetColumn field="isRequired" name="isRequired">
                { this.renderRequired.bind(this)}
              </Sheet.SheetColumn>
              <Sheet.SheetColumn field="default" name="defaultValue">
                { this.renderValue.bind(this, list) }
              </Sheet.SheetColumn>
              <Sheet.SheetColumn field="comment" name="Comment"/>
            </Sheet>
          </div>
        </div>
      </Card>
    );
  }
}

export default PropsTable;