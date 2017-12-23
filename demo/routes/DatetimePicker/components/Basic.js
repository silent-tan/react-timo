import React, { Component } from 'react';
import { Flex, DatetimePicker } from 'react-timo';
import moment from 'moment';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: ''
    };
  }
  handleChange = (selectedDates) => {
    this.setState({
      date: selectedDates
    });
  }
  render() {
    return (
      <Flex column>
        <Flex>
          <DatetimePicker
            value={this.state.date}
            onChange={this.handleChange}
            enableTime
            minDate={moment().subtract(1, 'minutes').format('YYYY-MM-DD HH:mm:ss')}
          />
        </Flex>
        <Flex className="mt-2rem">
          <DatetimePicker enable={false}/>
        </Flex>
      </Flex>
    );
  }
}

export default Demo;