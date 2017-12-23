import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Grid } from 'react-timo';
const { Row, Col } = Grid;
import _filter from 'lodash/filter';
import _includes from 'lodash/includes';
import _map from 'lodash/map';

class MethodList extends Component {
  static propTypes = {
    title: PropTypes.string,
    list: PropTypes.array
  }
  static defaultProps = {
    title: 'Method'
  }
  static getMethods(list) {
    const methodsTemp = list[0].methods;
    const methods = _filter(methodsTemp, method => {
      return _includes(method.modifiers, 'static');
    });
    return methods;
  }
  render() {
    const { list } = this.props;
    const methods = MethodList.getMethods(list);
    return(
      <Card title={this.props.title} desc="directly using the static method">
        {
          _map(methods, (method, i) => {
            return (
              <Row key={i}>
                <Col>
                  <h5>{method.name}()</h5>
                </Col>
              </Row>
            );
          })
        }
      </Card>
    );
  }
}

export default MethodList;