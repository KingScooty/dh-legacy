'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function callback(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/year/:year')

    // get all the year (accessed at GET http://localhost:8080/api/year)
    .get(function callback(req, res) {
      var db = req.db['dh_' + req.params.year];

      try {
        db.view('tweets/all_tweets', function callback(err, response) {
          if (err) {
            console.log(err);
          } else {
            res.json(response);
          }
        });
      } catch (exeception) {
        res.send(404);
      }

    });

module.exports = router;
