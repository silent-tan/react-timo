import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import _debounce from 'lodash/debounce';
import _noop from 'lodash/noop';
import _omit from 'lodash/omit';
import _isNil from 'lodash/isNil';

import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';

import './_slick.scss';

// matchMedia polyfill
if (typeof window !== 'undefined') {
  const matchMediaPolyfill = (mediaQuery) => {
    return {
      media: mediaQuery,
      matches: false,
      addListener: _noop,
      removeListener: _noop
    };
  };
  window.matchMedia = window.matchMedia || matchMediaPolyfill;
}

// Use require over import (will be lifted up)
// make sure matchMedia polyfill run before require('react-slick')
const SlickCarousel = require('react-slick').default;

/**
 * 轮播组件
 * @type {Component}
 * accessibility  启动键盘导航
 * className  container类名
 * adaptiveHeight 是否自动调整高度
 * arrows 是否显示箭头
 * nextArrow  下一个箭头React Element
 * prevArrow  上一个箭头React Element
 * autoplay 自动播放
 * autoplaySpeed  自动播放速度
 * centerMode 图片是否居中
 * centerPadding  ×
 * cssEase  ×
 * customPaging 自定义轮播模板
 * dots 是否显示点点点
 * dotsClass  dot的样式，如果dots开启的话
 * draggable  桌面版是否可以拖动
 * easing ×
 * fade 轮播是否使用渐变作为过渡
 * focusOnSelect  点击是否跳到轮播
 * infinite 是否无线轮播
 * initialSlide 那项被最初显示
 * lazyLoad 是否懒加载图片
 * pauseOnHover 是否阻止自动播放当hover的时候
 * rtl 是否倒序轮播
 * slide  ×
 * slidesToShow 同一时间显示多少个item
 * slidesToScroll 滚动一下需要改变多少item
 * speed  ×
 * swipe ×
 * swipeToSlide 是否允许滑动轮播
 * touchMove  ×
 * touchThreshold ×
 * variableWidth  ×
 * useCSS 是否使用css过度
 * vertical 竖向模式
 * afterChange
 * beforeChange
 * slickGoTo  跳到某一项
 * style  外层样式定义背景色
 */

class Slick extends Component {
  static NextArrow = NextArrow
  static PrevArrow = PrevArrow
  static propTypes = {
    accessibility: PropTypes.bool,
    className: PropTypes.string,
    adaptiveHeight: PropTypes.bool,
    centerPadding: PropTypes.any,
    arrows: PropTypes.bool,
    nextArrow: PropTypes.any,
    prevArrow: PropTypes.any,
    autoplay: PropTypes.bool,
    autoplaySpeed: PropTypes.number,
    centerMode: PropTypes.bool,
    cssEase: PropTypes.any,
    customPaging: PropTypes.func,
    dots: PropTypes.bool,
    dotsClass: PropTypes.string,
    draggable: PropTypes.bool,
    easing: PropTypes.string,
    fade: PropTypes.bool,
    focusOnSelect: PropTypes.bool,
    infinite: PropTypes.bool,
    initialSlide: PropTypes.number,
    lazyLoad: PropTypes.bool,
    pauseOnHover: PropTypes.bool,
    prefixCls: PropTypes.string,
    rtl: PropTypes.bool,
    slide: PropTypes.string,
    slidesToShow: PropTypes.number,
    slidesToScroll: PropTypes.number,
    speed: PropTypes.number,
    swipe: PropTypes.bool,
    swipeToSlide: PropTypes.bool,
    touchMove: PropTypes.bool,
    touchThreshold: PropTypes.number,
    variableWidth: PropTypes.bool,
    useCSS: PropTypes.bool,
    vertical: PropTypes.bool,
    beforeChange: PropTypes.func,
    afterChange: PropTypes.func,
    slickGoTo: PropTypes.number,
    style: PropTypes.object,
    prevArrowStyle: PropTypes.object,
    nextArrowStyle: PropTypes.object
  }
  static defaultProps = {
    dots: true,
    arrows: false,
    prefixCls: 'nf-slick',
    draggable: false
  };

  constructor() {
    super();
    this.onWindowResized = _debounce(this.onWindowResized, 500, {
      leading: false
    });
  }

  componentDidMount() {
    const { autoplay } = this.props;
    if (autoplay) {
      window.addEventListener('resize', this.onWindowResized);
    }
    const slick = this.refsSlick;
    // https://github.com/ant-design/ant-design/issues/7191
    this.innerSlider = slick && slick.innerSlider;
  }

  componentWillUnmount() {
    const { autoplay } = this.props;
    if (autoplay) {
      window.removeEventListener('resize', this.onWindowResized);
      this.onWindowResized.cancel();
    }
  }

  onWindowResized = () => {
    // Fix https://github.com/ant-design/ant-design/issues/2550
    const slick = this.refsSlick;
    const { autoplay } = this.props;
    if (autoplay && slick && slick.innerSlider && slick.innerSlider.autoPlay) {
      slick.innerSlider.autoPlay();
    }
  }

  render() {
    const {
      prefixCls,
      className,
      vertical,
      nextArrow,
      prevArrow,
      style
    } = this.props;
    const cls = cx(prefixCls, className, {
      [`${prefixCls}-vertical`]: vertical
    });

    const tempProps = {};

    if(_isNil(nextArrow) || _isNil(prevArrow)) {
      tempProps.nextArrow = <NextArrow vertical={vertical}/>;
      tempProps.prevArrow = <PrevArrow vertical={vertical}/>;
    } else {
      tempProps.nextArrow = nextArrow;
      tempProps.prevArrow = prevArrow;
    }

    return (
      <div className={`${cls}`} style={style}>
        <SlickCarousel
          ref={refsNode => this.refsSlick = refsNode}
          {..._omit(this.props, ['nextArrow', 'prevArrow', 'prefixCls', 'style'])}
          {...tempProps}
        />
      </div>
    );
  }
}

export default Slick;
