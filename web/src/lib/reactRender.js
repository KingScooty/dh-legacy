'use strict';

// React
const React = require('react');
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

const minify = require('html-minifier').minify;

// Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers';

import routes from '../routes';
import * as actions from '../actions';

const store = applyMiddleware(thunkMiddleware)(createStore)(reducer);

// Private:

// Match url in context against our routes
const matchRoutes = async (context) => {
  return new Promise((resolve, reject) => {
    // We will see what the routes factory returns below
    const location = context.url;
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      if (error) {
        // Unable to match any route
        reject(error);
      }
      else {
        // Route matched

        let path = (renderProps && renderProps.location && renderProps.location.pathname) ? renderProps.location.pathname : redirectLocation.pathname;

        path = path.slice(1);

        console.log('PATH:', path);

        store.dispatch(actions.fetchEventIfNeeded('2015'))
        .then(() => {
          resolve({ redirectLocation, renderProps });
        });
      }
    });
  });
};

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
