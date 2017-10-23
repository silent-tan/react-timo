import React, { Component } from 'react';
import {Flex, SearchSelect} from 'react-timo';
import $ from 'jquery';

import _map from 'lodash/map';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {}
    };
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
        const searchList = _map(items, i => {
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
      selected
    });
  }

  render() {
    return (
      <Flex>
        <Flex width="300px" className="px-2">
          <SearchSelect
            selected={this.state.selected}
            onSearch={this.handleSearchSelect.bind(this)}
            onSelect={this.handleSelectSearchSelect.bind(this)}
          />
        </Flex>
      </Flex>
    );
  }
}

export default Demo;