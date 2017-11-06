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
 */ 

class Slick extends Component {
  static NextArrow = NextArrow
  static PrevArrow = PrevArrow
  static propTypes = {
    /**
     * use keyboard
     */
    accessibility: PropTypes.bool,
    /**
     * extra class name
     */
    className: PropTypes.string,
    /**
     * auto height
     */
    adaptiveHeight: PropTypes.bool,
    /**
     * padding
     */
    centerPadding: PropTypes.any,
    /**
     * show arrow
     */
    arrows: PropTypes.bool,
    /**
     * next arrow Element
     */
    nextArrow: PropTypes.any,
    /**
     * previous arrow Element
     */
    prevArrow: PropTypes.any,
    /**
     *  enable auto play
     */
    autoplay: PropTypes.bool,
    /**
     * auto play speed
     */
    autoplaySpeed: PropTypes.number,
    /**
     * protruding center
     */
    centerMode: PropTypes.bool,
    /**
     * css transisation
     */
    cssEase: PropTypes.any,
    /**
     * custom template for slick
     */
    customPaging: PropTypes.func,
    /**
     * enable dot
     */
    dots: PropTypes.bool,
    /**
     * extra dot class
     */
    dotsClass: PropTypes.string,
    /**
     * enable drag to slick
     */
    draggable: PropTypes.bool,
    /**
     * TODO
     */
    easing: PropTypes.string,
    /**
     * enable fade
     */
    fade: PropTypes.bool,
    /**
     * enable focus on select
     */
    focusOnSelect: PropTypes.bool,
    /**
     * infinite slick
     */
    infinite: PropTypes.bool,
    /**
     * show which item while initing
     */
    initialSlide: PropTypes.number,
    /**
     * enable lazy load
     */
    lazyLoad: PropTypes.bool,
    /**
     * pause while hovering
     */
    pauseOnHover: PropTypes.bool,
    /**
     * business class name
     */
    prefixCls: PropTypes.string,
    /**
     * step by step to play
     */
    rtl: PropTypes.bool,
    /**
     * TODO
     */
    slide: PropTypes.string,
    /**
     * show how many item in one time
     */
    slidesToShow: PropTypes.number,
    /**
     * slide how many item in one time
     */
    slidesToScroll: PropTypes.number,
    /**
     * TODO
     */
    speed: PropTypes.number,
    /**
     * TODO
     */
    swipe: PropTypes.bool,
    /**
     * enable swipe to play
     */
    swipeToSlide: PropTypes.bool,
    /**
     * TODO
     */
    touchMove: PropTypes.bool,
    /**
     * TODO
     */
    touchThreshold: PropTypes.number,
    /**
     * TODO
     */
    variableWidth: PropTypes.bool,
    /**
     * use css to transisation
     */
    useCSS: PropTypes.bool,
    /**
     * vertical mode
     */
    vertical: PropTypes.bool,
    /**
     * before change callback
     */
    beforeChange: PropTypes.func,
    /**
     * after change callback
     */
    afterChange: PropTypes.func,
    /**
     * jump to a item
     */
    slickGoTo: PropTypes.number,
    /**
     * extra style
     */
    style: PropTypes.object,
    /**
     * previous arrow style
     */
    prevArrowStyle: PropTypes.object,
    /**
     * next arrow style
     */
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
