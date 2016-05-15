'use strict';

const path = require('path');
const compress = require('koa-compress');
const morgan = require('koa-morgan');

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Router = require('react-router');
const RouterContext = Router.RouterContext;

// middleware
const Koa = require('koa');
const web = new Koa();

const logger = morgan('combined');
const serve = require('koa-static');

const routes = require('./routes');

web.use(serve(path.join(__dirname, 'dist')));

web.use(compress({
  flush: require('zlib').Z_SYNC_FLUSH
}));

web.use(logger);

web.use(async function(ctx, next) {
  let appHtml;

  Router.match({
    routes: routes,
    location: ctx.url
  },
  (error, redirectLocation, renderProps) => {
    if (error) {
      ctx.throw(error.message, 500);
    }
    else if (redirectLocation) {
      ctx.redirect(redirectLocation.pathname + redirectLocation.search);
    }
    else if (renderProps) {
      appHtml = ReactDOMServer.renderToString(<RouterContext {...renderProps} />);
      ctx.body = appHtml;
    }
  });
  await next();
});

function renderPage(renderedBody) {
  let html = `
      <!doctype html>
      <html>
          <head>
              <meta charset="utf-8" />
              <title>{head.title}</title>
          </head>
          <body>
              <div id="app">${renderedBody}</div>

              <script src="/bundle.js"></script>
          </body>
      </html>
  `;

  return html;
}

module.exports = web;
