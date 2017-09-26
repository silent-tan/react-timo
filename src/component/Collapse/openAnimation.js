import cssAnimation from 'css-animation';

import _noop from 'lodash/noop';
import _filter from 'lodash/filter';

const availablePrefixs = ['moz', 'ms', 'webkit'];
const prefixCls = 'nf-motion-collapse';

function requestAnimationFramePolyfill() {
  let lastTime = 0;
  return function(callback) {
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16 - (currTime - lastTime));
    const id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}

function getRequestAnimationFrame() {
  if (typeof window === 'undefined') {
    return _noop;
  }
  if (window.requestAnimationFrame) {
    // https://github.com/vuejs/vue/issues/4465
    return window.requestAnimationFrame.bind(window);
  }

  const prefix = _filter(availablePrefixs, key => `${key}RequestAnimationFrame` in window)[0];

  return prefix
    ? window[`${prefix}RequestAnimationFrame`]
    : requestAnimationFramePolyfill();
}

function cancelRequestAnimationFrame(id) {
  if (typeof window === 'undefined') {
    return null;
  }
  if (window.cancelAnimationFrame) {
    return window.cancelAnimationFrame(id);
  }
  const prefix = _filter(availablePrefixs, key =>
    `${key}CancelAnimationFrame` in window || `${key}CancelRequestAnimationFrame` in window,
  )[0];

  return prefix ?
    (window[`${prefix}CancelAnimationFrame`] || window[`${prefix}CancelRequestAnimationFrame`]).call(this, id)
    : clearTimeout(id);
}

const reqAnimFrame = getRequestAnimationFrame();

function animate(node, show, done) {
  let height;
  let requestAnimationFrameId;
  return cssAnimation(node, prefixCls, {
    start() {
      if (!show) {
        node.style.height = `${node.offsetHeight}px`;
        node.style.opacity = 1;
      } else {
        height = node.offsetHeight;
        node.style.height = 0;
        node.style.opacity = 0;
      }
    },
    active() {
      if (requestAnimationFrameId) {
        cancelRequestAnimationFrame(requestAnimationFrameId);
      }
      requestAnimationFrameId = reqAnimFrame(() => {
        node.style.height = `${show ? height : 0}px`;
        node.style.opacity = show ? 1 : 0;
      });
    },
    end() {
      if (requestAnimationFrameId) {
        cancelRequestAnimationFrame(requestAnimationFrameId);
      }
      node.style.height = '';
      node.style.opacity = '';
      done();
    }
  });
}

const animation = {
  enter(node, done) {
    return animate(node, true, done);
  },
  leave(node, done) {
    return animate(node, false, done);
  },
  appear(node, done) {
    return animate(node, true, done);
  }
};

export default animation;