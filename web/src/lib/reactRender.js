'use strict';

// React
const React = require('react');
import { renderToString } from 'react-dom/server';
import { match, RouterContext, createMemoryHistory } from 'react-router';
import { routerReducer } from 'react-router-redux';

const minify = require('html-minifier').minify;

// Redux
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers';

import routes from '../routes';
import * as actions from '../actions';

const store = createStore(
  combineReducers({
    events: reducer,
    routing: routerReducer
  }),
  {},
  applyMiddleware(thunkMiddleware)
);
// applyMiddleware(thunkMiddleware)(createStore)(reducer);

// Private:

// Match url in context against our routes
const matchRoutes = async (context) => {
  const history = createMemoryHistory();
  return new Promise((resolve, reject) => {
    // We will see what the routes factory returns below
    // const actions = [];
    const router = routes(history);
    const location = context.url;

    match({ routes: router, location }, (error, redirectLocation, renderProps) => {
      if (error) {
        // Unable to match any route
        reject(error);
      }
      else {
        // Route matched
        const path = context.path.slice(1);
        // console.log(location);

        // console.log('redirectlocation', redirectLocation);
        // console.log('renderPRops', renderProps);

        if (redirectLocation) {
          console.log('redirect location:', redirectLocation);
          resolve({ redirectLocation, renderProps });
        }

        // fetchData(context, renderProps).then(() => {
        //   resolve({ redirectLocation, renderProps });
        // });

        store.dispatch(actions.fetchEventIfNeeded(path))
        .then(() => {
          resolve({ redirectLocation, renderProps });
        });
      }
    });
  });
};

/* fetch data promise */
// function fetchData(context, renderProps) {
//   let { query, params } = renderProps;
//   return new Promise(function(resolve, reject) {
//     let comp = renderProps.components[renderProps.components.length - 1].archive.WrappedComponent;
//     console.log('COMP:', renderProps.components[renderProps.components.length - 1].archive.WrappedComponent.fetchData);
//     // let url = req.protocol + '://' + req.get('host');
//     let event = context.path.slice(1);
//     console.log('EVENT:::', event);
//     resolve(comp.fetchData(store, url));
//   });
// }

// const listenOnActions = (actions, callback) => {
//   if (actions.length === 0) {
//     callback([]);
//   } else if (actions.length === 1) {
//     // actions[0].listen((resp) => callback([resp]));
//     store.dispatch(action[0]);
//   }// else {
//   //   Reflux.joinLeading(...actions).listen(callback)
//   // }
// };

const handleError = async (context, error) => {
  console.error(error.stack);
  context.status = 500;
  context.body = 'Something went wrong. Plrease try again later.';
};

const handleRedirect = async (context, location) => {
  const {pathname, search} = location;
  context.redirect(pathname + search);
};

const safeStringify = (obj) => {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
};

const renderBody = (context, renderProps) => {
  const body = renderToString(
    <Provider store={ store }>
      <RouterContext {...renderProps} />
    </Provider>
  );

  const initialState = store.getState();

  const html = `<!DOCTYPE html>
  <html>
      <head>
          <meta charset="utf-8" />
          <title>{head.title}</title>
      </head>
      <body>
          <div id="app">${body}</div>

          <script charSet="utf-8" id="__INITIAL_STATE__" type="application/json">${safeStringify(initialState)}</script>

          <script src="/bundle.js"></script>
      </body>
  </html>`;

  // trim that whitespace
  context.body = minify(html, {
    removeAttributeQuotes: true,
    collapseWhitespace: true
  });
};

// Public:

const renderReactComponents = async (context) => {
  try {
    const { redirectLocation, renderProps } = await matchRoutes(context);
    if (redirectLocation) {
      handleRedirect(context, redirectLocation);
    }
    else {
      renderBody(context, renderProps);
    }
  }
  catch (error) {
    await handleError(context, error);
  }
};

export default renderReactComponents;
