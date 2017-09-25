import React from 'react';
import {render} from 'react-dom';
import {Router, hashHistory} from 'react-router';
import './index.scss';

const rootRoute = {
  childRoutes: [
    {
      path: '/',
      breadcrumbName: '首页',
      component: require('./component/App').default,
      indexRoute: { onEnter: (nextState, replace) => replace('/home') },
      childRoutes: [
        require('./routes/Home').default,
        require('./routes/Icon').default,
        require('./routes/Loading').default
      ]
    }
  ]
};

render((
  <Router history={hashHistory} routes={rootRoute}/>
), window.document.getElementById('appContainer'));