import React, { Component } from 'react';
import _map from 'lodash/map';
import {
  Flex,
  Card,
  Icon,
  Sheet
} from '../../../../src';

import icons from '../config/icons';
import props from '../config/props';
import ExampleHeader from '../../../component/ExampleHeader';

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
        <Card title="Props">
          <div className="row">
            <div className="col-sm-12">
              <Sheet list={props}>
                <Sheet.SheetColumn field="props" name="Props名称"/>
                <Sheet.SheetColumn field="isRequired" name="是否必须"/>
                <Sheet.SheetColumn field="default" name="默认值"/>
                <Sheet.SheetColumn field="comment" name="Props说明"/>
              </Sheet>
            </div>
          </div>
        </Card>
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