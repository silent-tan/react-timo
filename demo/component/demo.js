import React from 'react';
import {
  Button,
  Tip
} from '../../src/index';

class Component extends React.Component {
  handleShowTip() {
    Tip.success('测试来一发');
  }
  render() {
    return (
      <div>
        demo
        <div>
          <Tip>Maecenas sed diam eget risus varius blandit sit amet non magna. Donec id elit non mi porta gravida at eget metus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</Tip>
          <hr/>
          <Button
            className="btn btn-primary"
            onClick={this.handleShowTip}
          >测试来一发</Button>
        </div>
      </div>
    );
  }
}
export default Component;
