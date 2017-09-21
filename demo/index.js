import './index.scss';
import React from 'react';
import {render} from 'react-dom';
import {Router, hashHistory} from 'react-router';

const rootRoute = {
  childRoutes: [
    {
      path: '/',
      breadcrumbName: '首页',
      component: require('./component/App').default,
      childRoutes: [
        require('./routes/Icon').default
      ]
    }
  ]
};

render((
  <Router history={hashHistory} routes={rootRoute}/>
), window.document.getElementById('appContainer'));