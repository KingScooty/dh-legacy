'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.format({
    text: function(){
      res.send('hey');
    },

    html: function(){
      res.render('index', { title: 'Express' });
    },

    json: function(){
      res.send({ message: 'hey' });
    }
  });
});

router.get('/:year', function(req, res) {
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

module.exports = router;
