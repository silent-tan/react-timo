import React from 'react';
import ReactDOM from 'react-dom';

import _some from 'lodash/some';
import _noop from 'lodash/noop';

import Dialog from './Modal';
import Icon from '../Icon';
import Button from '../Button';

/**
 * 信息框集合
 * @param  {Object} config 信息框配置
 * @return {Object}        返回destroy方法供使用者手动销毁信息框
 */
function confirm(config) {
  const props = {
    width: 416,
    style: {},
    maskClosable: false,
    submitText: '确定',
    cancelText: '取消',
    className: '',
    type: 'basic',
    iconType: 'help-outline',
    onSubmit: _noop,
    onClose: _noop,
    title: 'Here\'s a message!',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat, tincidunt vitae ipsum et, pellentesque maximus enim. Mauris eleifend ex semper, lobortis purus sed, pharetra felis',
    okCancel: false,
    ...config
  };
  const div = window.document.createElement('div');
  window.document.body.appendChild(div);

  function close(...args) {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    const triggerCancel = args && args.length && _some(args, param => param && param.triggerCancel);
    if (props.onClose && triggerCancel) {
      props.onClose(...args);
    }
  }

  function onSubmit() {
    props.onSubmit();
    close();
  }

  function onClose() {
    props.onClose();
    close();
  }

  const body = (
    <div className="nf-confirm-body">
      {
        props.type === 'basic'
          ? null
          :
          (
            <div className={`nf-confirm-icon-${props.type}`}>
              <Icon type={props.iconType}/>
            </div>
          )
      }
      <h2 className="nf-confirm-title">{props.title}</h2>
      <div className="nf-confirm-content">{props.content}</div>
    </div>
  );

  let footer = null;
  if(props.okCancel) {
    footer = (
      <div className="nf-confirm-footer mt-4">
        <Button onClick={onSubmit} className="btn-danger mr-2">{props.submitText}</Button>
        <Button onClick={onClose} className="btn-secondary">{props.cancelText}</Button>
      </div>
    );
  } else {
    footer = (
      <div className="nf-confirm-footer mt-5">
        <Button onClick={onSubmit} className="btn-primary">{props.submitText}</Button>
      </div>
    );
  }

  // 传递给Modal的props覆盖
  ReactDOM.render(
    <Dialog
      className={props.className}
      footer=""
      maskClosable={props.maskClosable}
      maskTransitionName="fade"
      onClose={close.bind(this, { triggerCancel: true })}
      show={true}
      style={props.style}
      title=""
      transitionName="zoom"
      width={props.width}
    >
      <div className="nf-confirm-body-wrapper">
        {body}
        {footer}
      </div>
    </Dialog>
    , div
  );

  return {
    destroy: close
  };
}

export default confirm;