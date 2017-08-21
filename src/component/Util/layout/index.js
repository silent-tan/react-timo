import _isNil from 'lodash/isNil';
import _isNumber from 'lodash/isNumber';

function getDefaultTarget() {
  return _isNil(window) ? window : null;
}

function getTargetRect(target) {
  return target !== window ? target.getBoundingClientRect() : { top: 0, left: 0, bottom: 0 };
}

function getScroll(target, top) {
  if (_isNil(window)) {
    return 0;
  }

  const prop = top ? 'pageYOffset' : 'pageXOffset';
  const method = top ? 'scrollTop' : 'scrollLeft';
  const isWindow = target === window;

  let ret = isWindow ? target[prop] : target[method];
  // ie6,7,8 standard mode
  if (isWindow && _isNumber(ret)) {
    ret = window.document.documentElement[method];
  }

  return ret;
}

function getOffset(element, target) {
  const elemRect = element.getBoundingClientRect();
  const targetRect = getTargetRect(target);

  const scrollTop = getScroll(target, true);
  const scrollLeft = getScroll(target, false);

  const docElem = window.document.body;
  const clientTop = docElem.clientTop || 0;
  const clientLeft = docElem.clientLeft || 0;

  return {
    top: elemRect.top - targetRect.top +
      scrollTop - clientTop,
    left: elemRect.left - targetRect.left +
      scrollLeft - clientLeft,
    width: elemRect.width,
    height: elemRect.height
  };
}

export {
  getDefaultTarget,
  getScroll,
  getTargetRect,
  getOffset
};