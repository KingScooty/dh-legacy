'use strict';

const path = require('path');
const compress = require('koa-compress');
const morgan = require('koa-morgan');

// middleware
const Koa = require('koa');
const web = new Koa();

const logger = morgan('combined');
const serve = require('koa-static');
// const minify = require('html-minifier').minify;

// const routes = require('./routes');

web.use(serve(path.join(__dirname, 'dist')));

web.use(compress({
  flush: require('zlib').Z_SYNC_FLUSH
}));

web.use(logger);

import renderReactComponents from './lib/reactRender';
web.use(renderReactComponents);

module.exports = web;
