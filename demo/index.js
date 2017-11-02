import React from 'react';
import {render} from 'react-dom';
import {Router, hashHistory} from 'react-router';
import './index.scss';

const rootRoute = {
  childRoutes: [
    {
      path: '/',
      indexRoute: { onEnter: (nextState, replace) => replace('/home') }
    },
    {
      path: '/components',
      breadcrumbName: '组件库',
      component: require('./component/App').default,
      indexRoute: { onEnter: (nextState, replace) => replace('/components/icon') },
      childRoutes: [
        require('./routes/Icon').default,
        require('./routes/Loading').default,
        require('./routes/Card').default,
        require('./routes/Button').default,
        require('./routes/Collapse').default,
        require('./routes/Grid').default,
        require('./routes/Flex').default,
        require('./routes/Pagination').default,
        require('./routes/SearchSelect').default,
        require('./routes/Breadcrumb').default,
        require('./routes/Clipboard').default,
        require('./routes/Checkbox').default,
        require('./routes/Radio').default,
        require('./routes/DatetimePicker').default,
        require('./routes/Dropdown').default,
        require('./routes/Modal').default,
        require('./routes/Notification').default
      ]
    }, {
      path: '/home',
      breadcrumbName: '首页',
      component: require('./component/Home').default
    }, {
      path: '/demo',
      component: require('./component/demo').default 
    }
  ]
};

render((
  <Router history={hashHistory} routes={rootRoute}/>
), window.document.getElementById('appContainer'));