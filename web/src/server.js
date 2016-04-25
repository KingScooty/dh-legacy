'use strict';
// const Promise = require('bluebird');
// const co = Promise.coroutine;
const register = require('babel-register');
const Compress = require('koa-compress');
const Morgan = require('koa-morgan');
const react = require('koa-react-view');
const path = require('path');

// middleware

const Koa = require('koa');
const web = new Koa();

const logger = Morgan('combined');
const viewpath = path.join(__dirname, 'views');

web.use(Compress({
    flush: require('zlib').Z_SYNC_FLUSH
}));

react(web, { views: viewpath });

// imports babel runtime for JSX views, warning: live transpiling
// best to precompile in production deploys for perf + reliability
register({
  only: [
    viewpath
  ]
});

// const config = require('./config/');
// const errorMiddleware = require('./middleware/errors');
// web.use(errorMiddleware());

// const router = require('./routes/')(web);
// router(web);

web.use(logger);


web.use(function* () {
  this.render('index', {
    title: 'List',
    list: [
      'hello koa',
      'hello react'
    ]
  });
});
// web
//   .use(router.routes())
//   .use(router.allowedMethods());

module.exports = web;
