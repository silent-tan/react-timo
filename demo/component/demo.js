import React, {Component} from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';

import {
  Button,
  FileUpload,
  Flex,
  Icon,
  Loading,
  Checkbox,
  Radio,
  Card,
  Breadcrumb,
  Modal,
  Switch,
  Notification,
  Tooltip,
  Popover,
  Transfer
} from '../../src/index';

class Demo extends Component {
  static propTypes = {
    routes: PropTypes.any
  }
  constructor() {
    super();
    this.handleChangeFile = ::this.handleChangeFile;
    this.state = {
      files: [],
      loading: false,
      dialog: false,
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
      },
      transfer: {
        sourceData: [{
          _transfer_id: 1,
          _transfer_value: '测试1'
        }],
        targetData: []
      }
    };
  }

  componentDidMount() {
    const sourceData = this.getTransferMockData();
    this.setState({
      transfer: {
        ...this.state.transfer,
        sourceData
      }
    });
  }
  getTransferMockData() {
    const sourceData = [];
    for (let i = 0; i < 10; i++) {
      sourceData.push({
        _transfer_id: i,
        _transfer_value: `transfer mock ${Math.random()}`
      });
    }

    return sourceData;
  }
  handleChangeFile(files) {
    this.setState({
      files
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
  handleDisplayDialog(display) {
    this.setState({
      dialog: display
    });
  }
  handleRenderModal(type) {
    Modal[type]({
      title: 'Here\'s a message!',
      content: 'Maecenas sed diam eget risus varius blandit sit amet non magna. Donec id elit non mi porta gravida at eget metus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.'
    });
  }
  handleShowNotification() {
    Notification.success({
      content: `阿狸${Math.random()}`,
      placement: 'topRight'
    });
  }
  handleChangeTransfer(sourceData, targetData) {
    this.setState({
      transfer: { sourceData, targetData }
    });
  }
  render() {
    return (
      <Flex className="mt-2" column>
        <Flex className="mb-2">
          <Icon type="3d-rotation"/>
        </Flex>
        <Flex className="mb-2">
          <FileUpload onChange={this.handleChangeFile}/>
        </Flex>
        {
          this.state.files.length ?
            <Flex className="img-thumb">
              <div className="row">
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
            </Flex>
            : null
        }
        <Flex>
          <Loading />
        </Flex>
        <Flex>
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
        </Flex>
        <Flex>
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
        </Flex>
        <Flex>
          <Card title="测试Card">
            这些都是测试的内容啊哦哦哦哦哦哦
          </Card>
        </Flex>
        <Flex>
          <p>面包屑</p>
          <div className="mb-3">
            <Breadcrumb routes={this.props.routes} border={false}/>
          </div>
          <div>
            <Breadcrumb>
              <Breadcrumb.Item href="/hello">你好</Breadcrumb.Item>
              <Breadcrumb.Item>例子</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </Flex>
        <Flex>
          <p>Modal</p>
          <Button onClick={this.handleDisplayDialog.bind(this, true)}>打开模态框</Button>
          <Modal show={this.state.dialog} onClose={this.handleDisplayDialog.bind(this, false)} title="谭先生说">
            阿狸是最美的
          </Modal>
          <Button onClick={this.handleRenderModal.bind(this, 'success')}>Success</Button>
        </Flex>
        <Flex className="mb-2">
          <p>Switch</p>
          <Switch />
          <br />
          <Switch disabled/>
        </Flex>
        <Flex>
          <Button onClick={this.handleShowNotification.bind(this)}>Show Notification</Button>
        </Flex>
        <Flex>
          <Tooltip placement="topLeft" content="Prompt Text" >
            <span>这是一段文字</span>
          </Tooltip>
          <Tooltip placement="topLeft" content="Prompt Text" arrowPointAtCenter trigger="click">
            <Button>Arrow points to center / 箭头指向中心</Button>
          </Tooltip>
        </Flex>
        <Flex>
          <Popover
            placement="topLeft"
            title="Popover Title"
            content="And here's some amazing content. It's very engaging. Right?"
            trigger="click"
          >
            <Button>Popover</Button>
          </Popover>
        </Flex>
        <Flex width="100%">
          <Transfer
            sourceData={this.state.transfer.sourceData}
            targetData={this.state.transfer.targetData}
            onChange={this.handleChangeTransfer.bind(this)}
          />
        </Flex>
      </Flex>
    );
  }
}
export default Demo;
