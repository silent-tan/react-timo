import React, { Component } from 'react';
import _map from 'lodash/map';
import { Flex, Card, Icon, Clipboard, Notification } from 'react-timo';
import {ExampleHeader, PropsTable, Demobox} from 'demo-component';

import icons from '../config/icons';
import iconProps from '!!docgen-loader!../../../../src/component/Icon';
import code from '!!raw-loader!./Demo';
import Demo from './Demo';

class IconExample extends Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    Notification.success('复制成功');
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
                        <Clipboard text={icon} key={index}>
                          <div className="col-sm-4 icon-name-instance waves-effect" onClick={this.handleClick}>
                            <Icon type={icon} className="zmdi-hc-fw"/>
                            { icon }
                          </div>
                        </Clipboard>
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