import includes from 'lodash/includes';

function isMac(){
  return includes(window.navigator.userAgent, 'Mac');
}

export {
  isMac
};