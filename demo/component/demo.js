import React, {Component} from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';

import {
  Button,
  FileUpload,
  Flex,
  Icon,
  Tip,
  Loading,
  Checkbox,
  Radio,
  Card,
  Breadcrumb
} from '../../src/index';

class Demo extends Component {
  static propTypes = {
    routes: PropTypes.any
  }
  constructor() {
    super();
    this.handleShowTip = ::this.handleShowTip;
    this.handleChangeFile = ::this.handleChangeFile;
    this.state = {
      files: [],
      loading: false,
      checkboxes: {
        options: [{
          label: '测试1',
          value: 1
        },{
          label: '测试2',
          value: 2
        }, {
          label: '测试3',
          value: 3
        }],
        values: [1]
      },
      radios: {
        options: [{
          label: '测试1',
          value: 1
        },{
          label: '测试2',
          value: 2
        }, {
          label: '测试3',
          value: 3
        }],
        value: 1
      }
    };
  }
  handleChangeFile(files) {
    this.setState({
      files
    });
  }
  handleShowTip() {
    Tip.success('测试来一发');
    this.setState({
      loading: true
    }, () => {
      window.setTimeout(() => {
        this.setState({
          loading: false
        });
      }, 5000);
    });
  }
  handleChangeCheckboxes(values) {
    this.setState({
      checkboxes: {
        ...this.state.checkboxes,
        values
      }
    });
  }
  handleChangeRadios(value) {
    this.setState({
      radios: {
        ...this.state.radios,
        value
      }
    });
  }
  render() {
    return (
      <div className="mt-2">
        <div>
          <Tip>Maecenas sed diam eget risus varius blandit sit amet non magna. Donec id elit non mi porta gravida at eget metus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</Tip>
          <hr/>
          <Button
            loading={this.state.loading}
            className="btn btn-primary"
            onClick={this.handleShowTip}
          >测试来一发</Button>
        </div>
        <hr />
        <div>
          <Icon type="3d-rotation"/>
        </div>
        <hr />
        <div>
          <FileUpload onChange={this.handleChangeFile}/>
        </div>
        {
          this.state.files.length ?
            <div className="img-thumb row">
              {
                map(this.state.files, file => {
                  return (
                    <div className="col-md-2" key={file.name}>
                      <Flex alignCenter justifyCenter  height="250px" className="mb-2">
                        <img src={file.thumb} style={{maxWidth: '100%', maxHeight: '100%'}}/>
                      </Flex>
                    </div>
                  );
                })
              }
            </div>
            : null
        }
        <div>
          <Loading />
        </div>
        <hr />
        <div>
          <p>单个checkbox</p>
          <div className="mb-2">
            <Checkbox showText="测试"/>
            <Checkbox showText="测试" disabled/>
          </div>
          <p>Checkbox Group</p>
          <div>
            <Checkbox.Group
              options={this.state.checkboxes.options}
              values={this.state.checkboxes.values}
              onChange={this.handleChangeCheckboxes.bind(this)}
            />
          </div>
        </div>
        <hr />
        <div>
          <p>单个Radio</p>
          <div className="mb-2">
            <Radio showText="测试"/>
            <Radio showText="测试" disabled/>
          </div>
          <p>Radio Group</p>
          <div>
            <Radio.Group
              options={this.state.radios.options}
              value={this.state.radios.value}
              onChange={this.handleChangeRadios.bind(this)}
            />
          </div>
        </div>
        <hr />
        <div>
          <Card title="测试Card">
            这些都是测试的内容啊哦哦哦哦哦哦
          </Card>
        </div>
        <hr />
        <div>
          <p>面包屑</p>
          <div className="mb-3">
            <Breadcrumb routes={this.props.routes} />
          </div>
          <div>
            <Breadcrumb>
              <Breadcrumb.Item href="/hello"> 你好 </Breadcrumb.Item>
              <Breadcrumb.Item> 例子 </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
      </div>
    );
  }
}
export default Demo;
