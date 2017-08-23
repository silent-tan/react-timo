import _isNil from 'lodash/isNil';
import _isNumber from 'lodash/isNumber';
import _forEach from 'lodash/forEach';

let cached;

function getScrollBarSize(fresh) {
  if (fresh || cached === undefined) {
    const inner = window.document.createElement('div');
    inner.style.width = '100%';
    inner.style.height = '200px';

    const outer = window.document.createElement('div');
    const outerStyle = outer.style;

    outerStyle.position = 'absolute';
    outerStyle.top = 0;
    outerStyle.left = 0;
    outerStyle.pointerEvents = 'none';
    outerStyle.visibility = 'hidden';
    outerStyle.width = '200px';
    outerStyle.height = '150px';
    outerStyle.overflow = 'hidden';

    outer.appendChild(inner);

    window.document.body.appendChild(outer);

    const widthContained = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    let widthScroll = inner.offsetWidth;

    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth;
    }

    window.document.body.removeChild(outer);

    cached = widthContained - widthScroll;
  }
  return cached;
}

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

function setTransformOrigin(node, value) {
  const style = node.style;
  const browserPrefix = ['Webkit', 'Moz', 'Ms', 'ms'];
  _forEach(browserPrefix, (prefix) => {
    style[`${prefix}TransformOrigin`] = value;
  });
  style[`transformOrigin`] = value;
}

function offset(el) {
  const rect = el.getBoundingClientRect();
  const pos = {
    left: rect.left,
    top: rect.top
  };
  const doc = el.ownerDocument;
  const w = doc.defaultView || doc.parentWindow;
  pos.left += getScroll(w);
  pos.top += getScroll(w, true);
  return pos;
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
  getOffset,
  getScrollBarSize,
  setTransformOrigin,
  offset
};