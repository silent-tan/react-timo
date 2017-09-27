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
        require('./routes/Button').default
      ]
    }, {
      path: '/home',
      breadcrumbName: '首页',
      component: require('./component/Home').default
    }
  ]
};

render((
  <Router history={hashHistory} routes={rootRoute}/>
), window.document.getElementById('appContainer'));