import React, { Component } from 'react';
import { Flex, Slick } from 'react-timo';

class Demo extends Component {
  render() {
    return (
      <Flex className="mb-4 py-2 px-2" row>
        <style>
          {
            `
              .nf-slick .slick-slide {
                text-align: center;
                height: 160px;
                line-height: 160px;
                background: #364d79;
                overflow: hidden;
              }

              .nf-slick .slick-slide .flex-slick {
                color: #fff;
                height: 100%;
                font-size: 50px;
              }
            `
          }
        </style>
        <Flex className="mr-2 p-2rem" flex={1} style={{padding: '5rem'}}>
          <Slick autoplay arrows slidesToShow={2}>
            <div><Flex className="flex-slick" justifyCenter alignCenter>1</Flex></div>
            <div><Flex className="flex-slick" justifyCenter alignCenter>2</Flex></div>
            <div><Flex className="flex-slick" justifyCenter alignCenter>3</Flex></div>
            <div><Flex className="flex-slick" justifyCenter alignCenter>4</Flex></div>
          </Slick>
        </Flex>
        <Flex height="300px" flex={1} style={{padding: '5rem'}}>
          <Slick vertical arrows>
            <div><Flex className="flex-slick" justifyCenter alignCenter>1</Flex></div>
            <div><Flex className="flex-slick" justifyCenter alignCenter>2</Flex></div>
            <div><Flex className="flex-slick" justifyCenter alignCenter>3</Flex></div>
            <div><Flex className="flex-slick" justifyCenter alignCenter>4</Flex></div>
          </Slick>
        </Flex>
      </Flex>
    );
  }
}

export default Demo;