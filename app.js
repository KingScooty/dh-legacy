'use strict';

var express = require('express');
var path = require('path');
// var favicon = require('static-favicon');
var favicon = require('serve-favicon');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cradle = require('cradle');

var twitter_sockets = require('./server/twitter_sockets');

// routes
var routes = require('./routes/index');
// var users = require('./routes/users');
// var api = require('./routes/api');

var app = express();
var config = require('./server/_config').init(app.get('env'));


// couchdb-3c369e79-1.kingscooty.cont.tutum.io:5984/_utils/
var c = new (cradle.Connection)(config.database.host, 5984, {
  cache: true,
  raw: false,
  auth: config.database.auth
});

var db = {
  dh_2012: c.database('digitalheroes-2012'),
  dh_2013: c.database('digitalheroes-2013'),
  dh_2014: c.database('digitalheroes-2014'),
  dh_2015: c.database('digitalheroes-2015')
};

twitter_sockets(config.twitter, db.dh_2015);

// Expose database object as a global on handler
app.use(function(req, res, next) {
  req.db = db;
  next();
});

// middleware for json headers
app.use(function (req, res, next) {
  var format = req.param('format');

  if (format) {
    req.headers.accept = 'application/' + format;
  }

  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
// app.use('/users', users);
// app.use('/api', api);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
