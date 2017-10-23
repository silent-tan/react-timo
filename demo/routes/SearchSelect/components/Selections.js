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

  static formatRepo (repo) {
    if (repo.loading) {
      return repo.text;
    }

    let markup = `<div class='select2-result-repository clearfix'>`;
  
    markup += `
      <div class='select2-result-repository__avatar mr-2'>
        <img src='${repo.owner.avatar_url}' />
      </div>
    `;

    markup += `<div class='select2-result-repository__meta'>`;

    markup += `
      <div class='select2-result-repository__title'>
        ${repo.full_name}
      </div>
    `;
  
    if (repo.description) {
      markup += `<div class='select2-result-repository__description'>${repo.description}</div>`;
    }
  
    markup += `
      <div class='select2-result-repository__statistics'>
        <div class='select2-result-repository__forks'>
          <i class='fa fa-flash'></i>${repo.forks_count} Forks
        </div>
        <div class='select2-result-repository__stargazers'>
          <i class='fa fa-star'></i> ${repo.stargazers_count} Stars
        </div>
        <div class='select2-result-repository__watchers'>
          <i class='fa fa-eye'></i> ${repo.watchers_count} Watchers
        </div>
      </div>
    `;

    markup += `</div></div>`;
  
    return markup;
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
        <Flex width="100%" className="px-2">
          <SearchSelect
            selected={this.state.selected}
            templateResult={Demo.formatRepo}
            onSearch={this.handleSearchSelect.bind(this)}
            onSelect={this.handleSelectSearchSelect.bind(this)}
          />
        </Flex>
      </Flex>
    );
  }
}

export default Demo;