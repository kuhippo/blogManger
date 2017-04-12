import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
// import pathToRegexp from 'path-to-regexp'
import App from './routes/app';
import Writer from './routes/writer/';
import WCatalog from './routes/writer/catalog/';
import Edit from './routes/writer/edit/WEdit';

const cached = {};
// 异步加载 model
const registerModel = (app, model) => {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
};


const test = () => {
  return (
    <div><h1>sasdaxxxx</h1></div>
  );
};



const Routers = function ({ history, app }) {
  const handleChildRoute = ({ location, params, routes }) => {
    console.log(location, params, routes);
  };

  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/dashboard'));
          cb(null, { component: require('./routes/dashboard/') });
        }, 'dashboard');
      },
      childRoutes: [
        {
          path: 'dashboard',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/dashboard'));
              cb(null, require('./routes/dashboard/'));
            }, 'dashboard');
          },
        },
        {
          path: 'blogs',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/blogs'));
              cb(null, require('./routes/blogs/'));
            }, 'dashboard');
          },
        },
      ],
    },
    {
      path: 'writer',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/writer'));
          cb(null, require('./routes/writer/'));
        }, 'writer');
      },
    },
    {
      path: 'writer/*',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/writer'));
          cb(null, require('./routes/writer/'));
        }, 'writer');
      },
    },
  ];

  return <Router routes={routes} history={history}/>
};

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};

export default Routers;

