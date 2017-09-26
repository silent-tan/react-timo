import React, { Component } from 'react';
import _map from 'lodash/map';
import { Flex, Card, Icon } from 'react-timo';
import {ExampleHeader, PropsTable, Demobox} from 'demo-component';

import icons from '../config/icons';
import iconProps from '!!docgen-loader!../../../../src/component/Icon';
import code from '!!raw-loader!./Demo';
import Demo from './Demo';

class IconExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex column className="demo-icons">
        <ExampleHeader
          title="Icon Component"
          desc="Material Design Iconic Font is a full suite of official material design icons (created and maintained by Google), with additional community-designed icons and brands icons for easy scalable vector graphics on websites or desktop"
        />
        <Card title="Example">
          <Demobox code={code}>
            <Demo />
          </Demobox>
        </Card>
        <PropsTable list={iconProps}/>
        {
          _map(icons, (value, key) => {
            return (
              <Card title={key} key={key}>
                <div className="row">
                  {
                    _map(value, (icon, index) => {
                      return (
                        <div className="col-sm-4" key={index}>
                          <Icon type={icon} className="zmdi-hc-fw"/>
                          { icon }
                        </div>
                      );
                    })
                  }
                </div>
              </Card>
            );
          })
        }
      </Flex>
    );
  }
}

export default IconExample;