'use strict';

const path = require('path');
const compress = require('koa-compress');
const morgan = require('koa-morgan');

// middleware
const Koa = require('koa');
const web = new Koa();

const logger = morgan('combined');
const serve = require('koa-static');
const minify = require('html-minifier').minify;

// React
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Router = require('react-router');
const RouterContext = Router.RouterContext;

// Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

import * as actions from './actions';

// const store = createStore(
//   reducer,
//   {},
//   applyMiddleware(thunkMiddleware)
// );

const store = applyMiddleware(thunkMiddleware)(createStore)(reducer);

const routes = require('./routes');

web.use(serve(path.join(__dirname, 'dist')));

web.use(compress({
  flush: require('zlib').Z_SYNC_FLUSH
}));

web.use(logger);

function fillStores(renderProps) {
  return store.dispatch(actions.fetchEventIfNeeded(renderProps.params.year))
  .then(() => {
    const initialState = store.getState();

    console.log('HELLO?!');
    // console.log(store.getState());

    const appHtml = ReactDOMServer.renderToString(
      <Provider store={ store }>
        <RouterContext {...renderProps} />
      </Provider>);

    // console.log(appHtml);

    // console.log(initialState);
    // console.log(renderPage(appHtml, initialState));

    // console.log(ctx);
    return renderPage(appHtml, initialState);

  });
}

web.use(async (ctx, next) => {
  // let appHtml;

  await Router.match({
    routes: routes,
    location: ctx.url
  },
  async (error, redirectLocation, renderProps) => {
    if (error) {
      ctx.throw(error.message, 500);
    }
    else if (redirectLocation) {
      ctx.redirect(redirectLocation.pathname + redirectLocation.search);
    }
    else if (renderProps) {

      // appHtml = ReactDOMServer.renderToString(
      //   <Provider store={ store }>
      //     <RouterContext {...renderProps} />
      //   </Provider>);
      // ctx.body = renderPage(appHtml);

      // function renderView() {
      //   const InitialView = (
      //     <Provider store={ store }>
      //       <RouterContext {...renderProps} />
      //     </Provider>
      //   );
      //
      //   const componentHTML = ReactDOMServer.rendertoString(InitialView);
      //   const initialState = store.getState();
      //
      //   console.log('What is the initial state of the store????');
      //   console.log(initialState);
      //
      //   // return renderPage(componentHTML, initialState);
      //   ctx.body = renderPage(componentHTML, initialState);
      // }

      // ctx.body = 'YO MAMA';
      // console.log('CTX:');
      // console.log(ctx.body);

      // .then(body => this.ctx.body = body);
      // ctx.body = 'FUCK YOU';
      // ctx.status(200);
      ctx.body = await fillStores(renderProps);
    }
    else {
      ctx.throw('404, Page not found, bro', 404);
    }
    // next();
  });
});



function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
}

function renderPage(renderedBody, initialState) {
  let html = `<!DOCTYPE html>
      <html>
          <head>
              <meta charset="utf-8" />
              <title>{head.title}</title>
          </head>
          <body>
              <div id="app">${renderedBody}</div>

              <script charSet="utf-8" id="__INITIAL_STATE__" type="application/json">${safeStringify(initialState)}</script>

              <script src="/bundle.js"></script>
          </body>
      </html>`;

  // trim that whitespace
  return minify(html, {
    removeAttributeQuotes: true,
    collapseWhitespace: true
  });
}

module.exports = web;
