export default [{
  props: 'type',
  isRequired: 'true',
  default: '——',
  comment: '图标名称, 名称和图标对照如下'
}, {
  props: 'style',
  isRequired: 'false',
  default: '{}',
  comment: '内联样式'
}, {
  props: 'onClick',
  isRequired: 'false',
  default: '() => {}',
  comment: '点击图标的触发点击回调'
}, {
  props: 'className',
  isRequired: 'false',
  default: "''",
  comment: '图标的额外类名'
}];