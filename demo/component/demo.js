import React, {Component} from 'react';
import _ from 'lodash';

import {
  Button,
  FileUpload,
  Flex,
  Tip
} from '../../src/index';

class Demo extends Component {
  constructor() {
    super();
    this.handleChangeFile = ::this.handleChangeFile;
    this.state = {
      files: []
    };
  }
  handleChangeFile(files) {
    this.setState({
      files
    });
  }
  handleShowTip() {
    Tip.success('测试来一发');
  }
  render() {
    console.log(this.state.files);
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
        <hr />
        <div>
          <FileUpload onChange={this.handleChangeFile}/>
        </div>
        {
          this.state.files.length ?
          <div className="img-thumb row">
            {
              _.map(this.state.files, file => {
                return (
                  <div className="col-md-2" key={file.name}>
                    <Flex alignCenter justifyCenter  height="250px" className="mb-2">
                      <img src={file.thumb} style={{maxWidth: '100%', maxHeight: '100%'}}/>
                    </Flex>
                  </div>
                );
              })
            }
          </div>
          : null
        }
      </div>
    );
  }
}
export default Demo;
