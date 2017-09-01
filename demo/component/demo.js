import React, {Component} from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import $ from 'jquery';
import _noop from 'lodash/noop';

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
  Transfer,
  DatetimePicker,
  Select,
  SearchSelect,
  Dropdown,
  Menu
} from '../../src/index';

const { SubMenu, MenuItem } = Menu;

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
      current: 'mail',
      searchSelect: {
        selected: {}
      },
      select: [
        {
          name: '测试1',
          value: 1
        },{
          name: '测试2',
          value: 2
        }, {
          name: '测试3',
          value: 3
        }
      ],
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
  handleSearchSelect(name, offset) {
    const result = {searchList: [], offset: 0, limit: 30, count: 0};
    $.ajax({
      async: false,
      url: "https://api.github.com/search/repositories",
      dataType: 'json',
      data: {
        q: name,
        page: (offset + 30) / 30
      },
      success: (data) => {
        const {items, total_count: count} = data;
        const searchList = map(items, i => {
          return {
            ...i,
            __select__name: i.name
          };
        });
        result.searchList = searchList;
        result.count = count;
      }
    });
    return Promise.resolve(result);
  }
  handleSelectSearchSelect(selected) {
    this.setState({
      searchSelect: {
        selected
      }
    });
  }
  render() {
    const titleRight = (
      <Flex alignCenter>
        <span>sub menu</span>
        <i className="zmdi zmdi-caret-right ml-2"/>
      </Flex>
    );
    const titleRight1 = (
      <Flex alignCenter>
        <span>sub menu1</span>
        <i className="zmdi zmdi-caret-right ml-2"/>
      </Flex>
    );
    const titleRight2 = (
      <Flex alignCenter>
        <span>sub menu2</span>
        <i className="zmdi zmdi-caret-right ml-2"/>
      </Flex>
    );
    const titleRight3 = (
      <Flex alignCenter>
        <span>sub menu3</span>
        <i className="zmdi zmdi-caret-right ml-2"/>
      </Flex>
    );
    return (
      <Flex className="mt-2 mb-2rem" column flex style={{marginBottom: 200}}>
        <Flex className="mb-4">
          <Icon type="3d-rotation"/>
        </Flex>
        <Flex className="mb-4">
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
                        <Flex alignCenter justifyCenter  height="250px" className="mb-4">
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
        <Flex className="mb-4">
          <Loading />
        </Flex>
        <Flex className="mb-4" column>
          <Flex className="mb-2">单个checkbox</Flex>
          <Flex className="mb-4">
            <Checkbox showText="测试"/>
            <Checkbox showText="测试" disabled/>
          </Flex>
          <Flex className="mb-2">Checkbox Group</Flex>
          <Flex>
            <Checkbox.Group
              options={this.state.checkboxes.options}
              values={this.state.checkboxes.values}
              onChange={this.handleChangeCheckboxes.bind(this)}
            />
          </Flex>
        </Flex>
        <Flex className="mb-4" column>
          <Flex className="mb-2">单个Radio</Flex>
          <Flex className="mb-4">
            <Radio showText="测试"/>
            <Radio showText="测试" disabled/>
          </Flex>
          <Flex className="mb-2">Radio Group</Flex>
          <Flex>
            <Radio.Group
              options={this.state.radios.options}
              value={this.state.radios.value}
              onChange={this.handleChangeRadios.bind(this)}
            />
          </Flex>
        </Flex>
        <Flex className="mb-4">
          <Card title="测试Card">
            这些都是测试的内容啊哦哦哦哦哦哦
          </Card>
        </Flex>
        <Flex className="mb-4" column>
          <Flex className="mb-2">面包屑</Flex>
          <Flex className="mb-3">
            <Breadcrumb routes={this.props.routes} border={false}/>
          </Flex>
          <Flex>
            <Breadcrumb>
              <Breadcrumb.Item href="/hello">你好</Breadcrumb.Item>
              <Breadcrumb.Item>例子</Breadcrumb.Item>
            </Breadcrumb>
          </Flex>
        </Flex>
        <Flex className="mb-4" column>
          <Flex className="mb-2">Modal</Flex>
          <Flex>
            <Button onClick={this.handleDisplayDialog.bind(this, true)}>打开模态框</Button>
          </Flex>
          <Modal show={this.state.dialog} onClose={this.handleDisplayDialog.bind(this, false)} title="谭先生说">
            阿狸是最美的
          </Modal>
          <Flex>
            <Button onClick={this.handleRenderModal.bind(this, 'success')}>Success</Button>
          </Flex>
        </Flex>
        <Flex className="mb-4" column>
          <Flex>Switch</Flex>
          <Flex>
            <Switch className="mr-2"/>
            <Switch disabled/>
          </Flex>
        </Flex>
        <Flex className="mb-4" column>
          <Flex className="mb-2">Notification</Flex>
          <Flex>
            <Button onClick={this.handleShowNotification.bind(this)}>Show Notification</Button>
          </Flex>
        </Flex>
        <Flex className="mb-4" column>
          <Flex className="mb-2">Tooltip</Flex>
          <Flex className="mb-2">
            <Tooltip placement="topLeft" content="Prompt Text" >
              <span>这是一段文字</span>
            </Tooltip>
          </Flex>
          <Flex>
            <Tooltip placement="topLeft" content="Prompt Text" arrowPointAtCenter trigger="click">
              <Button>Arrow points to center / 箭头指向中心</Button>
            </Tooltip>
          </Flex>
        </Flex>
        <Flex className="mb-4" column>
          <Flex className="mb-2">Popover</Flex>
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
        </Flex>
        <Flex width="100%" className="mb-4" column>
          <Flex className="mb-2">Transfer</Flex>
          <Flex>
            <Transfer
              sourceData={this.state.transfer.sourceData}
              targetData={this.state.transfer.targetData}
              onChange={this.handleChangeTransfer.bind(this)}
            />
          </Flex>
        </Flex>
        <Flex className="mb-4 pt-2 pb-2 bg-white" column>
          <Flex className="mb-2">DatetimePicker</Flex>
          <Flex>
            <DatetimePicker />
          </Flex>
        </Flex>
        <Flex className="mb-4 pt-2 pb-2 bg-white" column>
          <Flex className="mb-2">Select</Flex>
          <Flex width="100%" className="px-2">
            <Select options={this.state.select} />
          </Flex>
        </Flex>
        <Flex className="mb-4 pt-2 pb-2 bg-white" column>
          <Flex className="mb-2">SearchSelect</Flex>
          <Flex width="100%" className="px-2">
            <SearchSelect
              selected={this.state.searchSelect.selected}
              onSearch={this.handleSearchSelect.bind(this)}
              onSelect={this.handleSelectSearchSelect.bind(this)}
            />
          </Flex>
        </Flex>
        <Flex className="mb-4 py-2">
          <Menu
            mode="horizontal"
            onSelect={_noop}
            defaultActiveFirst
            onClick={_noop}
          >
            <SubMenu title={titleRight} key="1">
              <MenuItem key="1-1">0-1</MenuItem>
              <MenuItem key="1-2">0-2</MenuItem>
            </SubMenu>
            <MenuItem>
              <a href="http://taobao.com">i do not need key</a>
            </MenuItem>
            <MenuItem key="3">outer</MenuItem>
            <SubMenu title={titleRight1} key="4">
              <MenuItem key="4-1">inner inner</MenuItem>
              <SubMenu
                key="4-2"
                title={titleRight2}
              >
                <MenuItem key="4-2-1">inn</MenuItem>
                <SubMenu title={titleRight3} key="4-2-2">
                  <MenuItem key="4-2-2-1">inner inner</MenuItem>
                  <MenuItem key="4-2-2-2">inner inner2</MenuItem>
                </SubMenu>
              </SubMenu>
            </SubMenu>
            <MenuItem disabled>disabled</MenuItem>
            <MenuItem key="4-3">outer3</MenuItem>
          </Menu>
        </Flex>
        <Flex className="mb-4" width="200px">
          <Menu
            onSelect={_noop}
            defaultActiveFirst
            onClick={_noop}
          >
            <SubMenu title={titleRight} key="1">
              <MenuItem key="1-1">0-1</MenuItem>
              <MenuItem key="1-2">0-2</MenuItem>
            </SubMenu>
            <MenuItem>
              <a href="http://taobao.com">i do not need key</a>
            </MenuItem>
            <MenuItem key="3">outer</MenuItem>
            <SubMenu title={titleRight1} key="4">
              <MenuItem key="4-1">inner inner</MenuItem>
              <SubMenu
                key="4-2"
                title={titleRight2}
              >
                <MenuItem key="4-2-1">inn</MenuItem>
                <SubMenu title={titleRight3} key="4-2-2">
                  <MenuItem key="4-2-2-1">inner inner</MenuItem>
                  <MenuItem key="4-2-2-2">inner inner2</MenuItem>
                </SubMenu>
              </SubMenu>
            </SubMenu>
            <MenuItem disabled>disabled</MenuItem>
            <MenuItem key="4-3">outer3</MenuItem>
          </Menu>
        </Flex>
        <Flex className="mb-4" width="200px">
          <Menu
            mode="inline"
            onSelect={_noop}
            defaultActiveFirst
            onClick={_noop}
          >
            <SubMenu title={titleRight} key="1">
              <MenuItem key="1-1">0-1</MenuItem>
              <MenuItem key="1-2">0-2</MenuItem>
            </SubMenu>
            <MenuItem>
              <a href="http://taobao.com">i do not need key</a>
            </MenuItem>
            <MenuItem key="3">outer</MenuItem>
            <SubMenu title={titleRight1} key="4">
              <MenuItem key="4-1">inner inner</MenuItem>
              <SubMenu
                key="4-2"
                title={titleRight2}
              >
                <MenuItem key="4-2-1">inn</MenuItem>
                <SubMenu title={titleRight3} key="4-2-2">
                  <MenuItem key="4-2-2-1">inner inner</MenuItem>
                  <MenuItem key="4-2-2-2">inner inner2</MenuItem>
                </SubMenu>
              </SubMenu>
            </SubMenu>
            <MenuItem disabled>disabled</MenuItem>
            <MenuItem key="4-3">outer3</MenuItem>
          </Menu>
        </Flex>
        <Flex className="mb-4 py-2 bg-white" column alignCenter>
          <Dropdown overlay={(<span>你好</span>)} trigger="click">
            <Button>点击我</Button>
          </Dropdown>
        </Flex>
      </Flex>
    );
  }
}
export default Demo;
