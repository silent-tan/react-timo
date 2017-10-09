import React, { Component } from 'react';
import {Flex, Collapse} from 'react-timo';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.handleChange = ::this.handleChange;
    this.state = {
      activeKey: '1'
    };
  }

  handleChange(activeKey) {
    this.setState({
      activeKey
    });
  }

  render() {
    const text = `
      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
    `;
    return (
      <Flex>
        <Collapse activeKey={this.state.activeKey} onChange={this.handleChange}>
          <Collapse.Panel header="Collapsible Group Item #1" key="1">
            {text}
          </Collapse.Panel>
          <Collapse.Panel header="Collapsible Group Item #3" key="2">
            {text}
          </Collapse.Panel>
          <Collapse.Panel header="Collapsible Group Item #3" key="3">
            {text}
          </Collapse.Panel>
        </Collapse>
      </Flex>
    );
  }
}

export default Demo;