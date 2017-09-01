import _noop from 'lodash/noop';
import _filter from 'lodash/filter';

const availablePrefixs = ['moz', 'ms', 'webkit'];

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

export default function getRequestAnimationFrame() {
  if (typeof window === 'undefined') {
    return _noop;
  }
  if (window.requestAnimationFrame) {
    // https://github.com/vuejs/vue/issues/4465
    return window.requestAnimationFrame.bind(window);
  }

  const prefix = _filter(availablePrefixs, key => `${key}RequestAnimationFrame` in window)[0];

  return prefix ? window[`${prefix}RequestAnimationFrame`] : requestAnimationFramePolyfill();
}

export function cancelRequestAnimationFrame(id) {
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