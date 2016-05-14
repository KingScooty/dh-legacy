'use strict';
// const Promise = require('bluebird');
// const co = Promise.coroutine;
const path = require('path');
const register = require('babel-register');
const compress = require('koa-compress');
const morgan = require('koa-morgan');
const react = require('koa-react-view');
// middleware

const Koa = require('koa');
const web = new Koa();

const logger = morgan('combined');
const srcPath = __dirname;
const viewpath = path.join(__dirname, 'views');
// const containerPath = path.join(__dirname, 'containers');
// const componentpath = path.join(__dirname, 'components');

const serve = require('koa-static');

web.use(serve(path.join(__dirname, 'dist')));

web.use(compress({
  flush: require('zlib').Z_SYNC_FLUSH
}));

react(web,
  {
    views: viewpath,
    internals: true
  }
);

// imports babel runtime for JSX views, warning: live transpiling
// best to precompile in production deploys for perf + reliability
register({
  only: [
    srcPath
    // viewpath,
    // containerPath,
    // componentpath
  ]
});

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

var tweetData = require('./components/Post/__specs__/mocks/tweet_2015_with_multiple_media.json');

web.use(function* () {
  this.render('index', {
    title: 'List',
    list: [
      'hello koa',
      'hello react'
    ],
    posts: [tweetData, tweetData, tweetData]
  });
});



// router.get('*', (ctx, next) => {
//
// });


// web
//   .use(router.routes())
//   .use(router.allowedMethods());

module.exports = web;
