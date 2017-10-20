import React, {Component} from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import $ from 'jquery';
import _noop from 'lodash/noop';

import {
  Button,
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
  Highlight,
  DatetimePicker,
  Select,
  SearchSelect,
  Dropdown,
  Menu,
  Tag,
  Slick,
  Tabs,
  Collapse
} from 'react-timo';

const { SubMenu, MenuItem } = Menu;

class MyTag extends React.Component {
  state = { checked: true };
  handleChange = (checked) => {
    this.setState({ checked });
  }
  render() {
    return <Tag.CheckableTag {...this.props} checked={this.state.checked} onChange={this.handleChange} />;
  }
}

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
      },
      tabPosition: 'top'
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
  handleTabsChange(key) {
    console.log(key); // eslint-disable-line
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

    const text = `
      A dog is a type of domesticated animal.
      Known for its loyalty and faithfulness,
      it can be found as a welcome guest in many households across the world.
    `;

    return (
      <Flex className="mt-2 mb-2rem" column flex style={{marginBottom: 200}}>
        <Flex className="mb-4">
          <Loading />
        </Flex>
        <Flex className="mb-4">
          <Highlight>
            dfjsdjflksdj
          </Highlight>
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
          <Flex>
            <Breadcrumb>
              <Breadcrumb.Item href="/hello" key={1}>你好</Breadcrumb.Item>
              <Breadcrumb.Item key={2}>例子</Breadcrumb.Item>
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
            <DatetimePicker enableTime={true}/>
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
        <Flex>Menu</Flex>
        <Flex className="mb-4 py-2">
          <Menu
            mode="horizontal"
            onSelect={_noop}
            defaultActiveFirst
            onClick={_noop}
            justify="end"
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
            mode="vertical"
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
        <Flex>
          Dropdown
        </Flex>
        <Flex className="mb-4 py-2">
          <Dropdown
            overlay={
              <Menu
                onClick={this.handleMenuClick}>
                <MenuItem key="1">Clicking me will not close the menu.</MenuItem>
                <MenuItem key="2">Clicking me will not close the menu also.</MenuItem>
                <MenuItem key="3">Clicking me will close the menu</MenuItem>
              </Menu>
            }
            trigger="click"
          >
            <Button>点击我</Button>
          </Dropdown>
        </Flex>
        <Flex>
          Tag
        </Flex>
        <Flex className="mb-4 py-2 px-2 bg-white">
          <Tag color="blue" closable>Tag 1</Tag>
          <Tag color="blue">Can not be closed</Tag>
          <Tag color="blue" closable onClose={e => e.preventDefault()}>preventDefault</Tag>
        </Flex>
        <Flex className="mb-4 py-2 px-2 bg-white">
          <MyTag>Tag1</MyTag>
          <MyTag>Tag2</MyTag>
          <MyTag>Tag3</MyTag>
        </Flex>
        <Flex>Slick</Flex>
        <style>
          {
            `
              .nf-slick .slick-slide {
                text-align: center;
                height: 160px;
                line-height: 160px;
                background: #364d79;
                overflow: hidden;
              }

              .nf-slick .slick-slide .flex-slick {
                color: #fff;
                height: 100%;
                font-size: 50px;
              }
            `
          }
        </style>
        <Flex className="mb-4 py-2 px-2" row>
          <Flex className="mr-2 p-2rem" flex={1} style={{padding: '5rem'}}>
            <Slick autoplay arrows slidesToShow={2}>
              <div><Flex className="flex-slick" justifyCenter alignCenter>1</Flex></div>
              <div><Flex className="flex-slick" justifyCenter alignCenter>2</Flex></div>
              <div><Flex className="flex-slick" justifyCenter alignCenter>3</Flex></div>
              <div><Flex className="flex-slick" justifyCenter alignCenter>4</Flex></div>
            </Slick>
          </Flex>
          <Flex height="300px" flex={1} style={{padding: '5rem'}}>
            <Slick vertical arrows>
              <div><Flex className="flex-slick" justifyCenter alignCenter>1</Flex></div>
              <div><Flex className="flex-slick" justifyCenter alignCenter>2</Flex></div>
              <div><Flex className="flex-slick" justifyCenter alignCenter>3</Flex></div>
              <div><Flex className="flex-slick" justifyCenter alignCenter>4</Flex></div>
            </Slick>
          </Flex>
        </Flex>
        <Flex>
          <Flex flex={1} column className="mr-2">
            <Flex>
              Tabs Normal
            </Flex>
            <Flex className="mb-4 py-2 px-2 bg-white" column>
              <Tabs defaultActiveKey="1" onChange={this.handleTabsChange.bind(this)}>
                <Tabs.TabPane tab="Tab 1" key="1">Content of Tab Pane 1</Tabs.TabPane>
                <Tabs.TabPane tab="Tab 2" key="2">Content of Tab Pane 2</Tabs.TabPane>
                <Tabs.TabPane tab="Tab 3" key="3">Content of Tab Pane 3</Tabs.TabPane>
              </Tabs>
            </Flex>
          </Flex>
          <Flex flex={1} column>
            <Flex>
              Tabs disabled
            </Flex>
            <Flex className="mb-4 py-2 px-2 bg-white" column>
              <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Tab 1" key="1">Tab 1</Tabs.TabPane>
                <Tabs.TabPane tab="Tab 2" disabled key="2">Tab 2</Tabs.TabPane>
                <Tabs.TabPane tab="Tab 3" key="3">Tab 3</Tabs.TabPane>
              </Tabs>
            </Flex>
          </Flex>
        </Flex>
        <Flex>
          <Flex flex={1} column className="mr-2">
            <Flex>
              Tabs Icon
            </Flex>
            <Flex className="mb-4 py-2 px-2 bg-white" column>
              <Tabs defaultActiveKey="2">
                <Tabs.TabPane tab={<span><Icon type="apple" />Tab 1</span>} key="1">
                  Tab 1
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span><Icon type="android" />Tab 2</span>} key="2">
                  Tab 2
                </Tabs.TabPane>
              </Tabs>
            </Flex>
          </Flex>
          <Flex flex={1} column>
            <Flex>
              Tabs Scroll
            </Flex>
            <Flex className="mb-4 py-2 px-2 bg-white">
              <Tabs
                defaultActiveKey="1"
                tabPosition="top"
                style={{ height: 120 }}
              >
                <Tabs.TabPane tab="Tab 1" key="1">Content of tab 1</Tabs.TabPane>
                <Tabs.TabPane tab="Tab 2" key="2">Content of tab 2</Tabs.TabPane>
                <Tabs.TabPane tab="Tab 3" key="3">Content of tab 3</Tabs.TabPane>
                <Tabs.TabPane tab="Tab 4" key="4">Content of tab 4</Tabs.TabPane>
                <Tabs.TabPane tab="Tab 5" key="5">Content of tab 5</Tabs.TabPane>
                <Tabs.TabPane tab="Tab 6" key="6">Content of tab 6</Tabs.TabPane>
                <Tabs.TabPane tab="Tab 7" key="7">Content of tab 7</Tabs.TabPane>
                <Tabs.TabPane tab="Tab 8" key="8">Content of tab 8</Tabs.TabPane>
                <Tabs.TabPane tab="Tab 9" key="9">Content of tab 9</Tabs.TabPane>
                <Tabs.TabPane tab="Tab 10" key="10">Content of tab 10</Tabs.TabPane>
                <Tabs.TabPane tab="Tab 11" key="11">Content of tab 11</Tabs.TabPane>
                <Tabs.TabPane tab="Tab 12" key="12">Content of tab 12</Tabs.TabPane>
                <Tabs.TabPane tab="Tab 13" key="13">Content of tab 13</Tabs.TabPane>
                <Tabs.TabPane tab="Tab 14" key="14">Content of tab 14</Tabs.TabPane>
                <Tabs.TabPane tab="Tab 15" key="15">Content of tab 15</Tabs.TabPane>
              </Tabs>
            </Flex>
          </Flex>
        </Flex>
        <Flex>
          Tabs position
        </Flex>
        <Flex className="mb-4 py-2 px-2 bg-white" column>
          <Flex className="mb-2">
            <Select
              selected={this.state.tabPosition}
              options={[
                {
                  value: 'top',
                  name: 'top'
                }, {
                  value: 'bottom',
                  name: 'bottom'
                }, {
                  value: 'left',
                  name: 'left'
                }, {
                  value: 'right',
                  name: 'right'
                }]
              }
              onChange={(value) => this.setState({tabPosition: value})}
            />
          </Flex>
          <Flex column>
            <Tabs tabPosition={this.state.tabPosition} style={{height: 200}}>
              <Tabs.TabPane tab="Tab 1" key="1">Content of Tab 1</Tabs.TabPane>
              <Tabs.TabPane tab="Tab 2" key="2">Content of Tab 2</Tabs.TabPane>
              <Tabs.TabPane tab="Tab 3" key="3">Content of Tab 3</Tabs.TabPane>
              <Tabs.TabPane tab="Tab 4" key="4">Content of Tab 4</Tabs.TabPane>
              <Tabs.TabPane tab="Tab 5" key="5">Content of Tab 5</Tabs.TabPane>
              <Tabs.TabPane tab="Tab 6" key="6">Content of Tab 6</Tabs.TabPane>
            </Tabs>
          </Flex>
        </Flex>
        <Flex className="mb-4 py-2 px-2 bg-white" column>
          <Collapse defaultActiveKey={['1']} onChange={_noop} accordion showArrow>
            <Collapse.Panel header="This is panel header 1" key="1">
              {text}
            </Collapse.Panel>
            <Collapse.Panel header="This is panel header 2" key="2">
              {text}
            </Collapse.Panel>
            <Collapse.Panel header="This is panel header 3" key="3" disabled>
              {text}
            </Collapse.Panel>
          </Collapse>
        </Flex>
      </Flex>
    );
  }
}
export default Demo;
