'use strict';
// const Promise = require('bluebird');
// const co = Promise.coroutine;
const path = require('path');
const register = require('babel-register');
const compress = require('koa-compress');
const morgan = require('koa-morgan');
// const react = require('koa-react-view');
// middleware

const Koa = require('koa');
const web = new Koa();

const logger = morgan('combined');
// const srcPath = __dirname;
// const viewpath = path.join(__dirname, 'views');
// const containerPath = path.join(__dirname, 'containers');
// const componentpath = path.join(__dirname, 'components');

const serve = require('koa-static');

web.use(serve(path.join(__dirname, 'dist')));

web.use(compress({
  flush: require('zlib').Z_SYNC_FLUSH
}));

// react(web,
//   {
//     views: viewpath,
//     internals: true
//   }
// );

// // imports babel runtime for JSX views, warning: live transpiling
// // best to precompile in production deploys for perf + reliability
// register({
//   only: [
//     srcPath
//     // viewpath,
//     // containerPath,
//     // componentpath
//   ]
// });

// const config = require('./config/');
// const errorMiddleware = require('./middleware/errors');
// web.use(errorMiddleware());

// const router = require('./routes/')(web);
// router(web);
// const router = require('./routes');//(web);
// router(web);

// web
//   .use(router.routes())
//   .use(router.allowedMethods());

web.use(logger);

// var tweetData = require('./components/Post/__specs__/mocks/tweet_2015_with_multiple_media.json');

// web.use(function* () {
//   this.render('index', {
//     title: 'List',
//     list: [
//       'hello koa',
//       'hello react'
//     ],
//     posts: [tweetData, tweetData, tweetData]
//   });
// });

var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Router = require('react-router');
var routes = require('./routes');

var RouterContext = Router.RouterContext;

// web.use(function *() {
//   let appHtml;
//
//   Router.match({
//     routes: routes,
//     location: this.url
//   }, (error, redirectLocation, renderProps) => {
//     if (error) {
//       this.throw(error.message, 500);
//     } else if (redirectLocation) {
//       this.redirect(redirectLocation.pathname + redirectLocation.search);
//     } else if (renderProps) {
//       appHtml = ReactDOMServer.renderToString(<RouterContext {...props} />);
//     }
//
//     let renderString = renderPage(appHtml);
//
//     this.body = renderString;
//   });
// });

let handler;

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
  // await next();
});

// web.use(async ctx => {
//   ctx.body = handler;
// });

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

// web
//   .use(router.routes())
//   .use(router.allowedMethods());

module.exports = web;
