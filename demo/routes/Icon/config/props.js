export default [{
  props: 'type',
  propTypes: 'string',
  isRequired: 'true',
  default: '——',
  comment: '图标名称, 名称和图标对照如下'
}, {
  props: 'style',
  propTypes: 'object',
  isRequired: 'false',
  default: '{}',
  comment: '内联样式'
}, {
  props: 'onClick',
  propTypes: 'func',
  isRequired: 'false',
  default: '() => {}',
  comment: '点击图标的触发点击回调'
}, {
  props: 'className',
  propTypes: 'string',
  isRequired: 'false',
  default: "''",
  comment: '图标的额外类名'
}];