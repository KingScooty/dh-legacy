'use strict';

var express = require('express');
var React = require('react');
// var Router = require('react-router');
// var routes = require('../public/javascripts/src/Routes.jsx');

var EventInfo = React.createFactory(require('../public/javascripts/src/jsx/EventInfo.jsx'));

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/halloween15');
});

router.get('/:year', function(req, res) {

  var db = req.db['dh_' + req.params.year];
  // var reactHtml = React.renderToString(EventInfo({}));

  try {
    db.view('tweets/event_info', {descending: true}, function callback(err, response) {

      if (err) {
        console.log(err);
      } else {
        res.format({
          text: function(){
            res.send('hey');
          },

          html: function(){
            var reactHtml = React.renderToString(EventInfo({data: response}));

            res.render('index', {
              reactOutput: reactHtml
            });
          },

          json: function(){
            res.send(response);
          }
        });
      }
    });
  } catch (exeception) {
    res.redirect('/');
  }

});

router.get('/:year/info', function(req, res) {
  var db = req.db['dh_' + req.params.year];

  try {
    db.view('tweets/event_info', function callback(err, response) {
      if (err) {
        console.log(err);
      } else {
        res.format({
          text: function(){
            res.send('hey');
          },

          html: function(){
            res.render('index', { title: 'Express' });
          },

          json: function(){
            res.send(response);
          }
        });
      }
    });
  } catch (exeception) {
    res.redirect('/');
  }
});


router.get('/:year/tweets', function(req, res) {
  var db = req.db['dh_' + req.params.year];

  try {
    db.view('tweets/all_tweets', {descending: true}, function callback(err, response) {
      if (err) {
        console.log(err);
      } else {
        res.format({
          text: function(){
            res.send('hey');
          },

          html: function(){
            res.render('index', { title: 'Express' });
          },

          json: function(){
            res.send(response);
          }
        });
      }
    });
  } catch (exeception) {
    res.redirect('/');
  }
});

// A utility function to safely escape JSON for embedding in a <script> tag
function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}

module.exports = router;
