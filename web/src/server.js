'use strict';
// const Promise = require('bluebird');
// const co = Promise.coroutine;
const Compress = require('koa-compress');
const Morgan = require('koa-morgan');

// middleware

const Koa = require('koa');
const web = new Koa();

const logger = Morgan('combined');

web.use(Compress({
    flush: require('zlib').Z_SYNC_FLUSH
}));

// const config = require('./config/');
// const errorMiddleware = require('./middleware/errors');
// web.use(errorMiddleware());

// const router = require('./routes/')(web);
// router(web);

web.use(logger);

// web
//   .use(router.routes())
//   .use(router.allowedMethods());

module.exports = web;
