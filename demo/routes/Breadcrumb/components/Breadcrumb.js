import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex, Card } from 'react-timo';
import {ExampleHeader, PropsTable, Demobox} from 'demo-component';

import breadcrumbProps from '!!docgen-loader!../../../../src/component/Breadcrumb/Breadcrumb';
import basicCode from '!!raw-loader!./Basic';
import Basic from './Basic';

import iconCode from '!!raw-loader!./Icon';
import Icon from './Icon';

import routeCode from '!!raw-loader!./Route';
import Route from './Route';

class BreadcrumbExample extends Component {
  static propTypes = {
    routes: PropTypes.array
  }
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex column className="demo-breadcrumb" flex={1}>
        <ExampleHeader
          title="Breadcrumb Component"
          desc="Indicate the current page’s location within a navigational hierarchy"
        />
        <Card title="Basic Example">
          <Demobox code={basicCode}>
            <Basic />
          </Demobox>
        </Card>
        <Card title="Icon Breadcrumb Example" desc="combination with Icon Component">
          <Demobox code={iconCode}>
            <Icon />
          </Demobox>
        </Card>
        <Card title="Route Breadcrumb Example" desc="support auto breadcrumb by react route, but only test in React Route v3">
          <Demobox code={routeCode}>
            <Route routes={this.props.routes}/>
          </Demobox>
        </Card>
        <PropsTable list={breadcrumbProps}/>
      </Flex>
    );
  }
}

export default BreadcrumbExample;