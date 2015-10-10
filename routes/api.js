'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function callback(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/year/:year')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    // .post(function(req, res) {
    //
    //     ...
    //
    // })

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
        // res.json({response: '404'});
      }

      // if (db) {
      //   db.exists(function callback(err, exists) {
      //     if (err) {
      //       console.log('error', err);
      //     } else if (exists) {
      //       db.view('tweets/all', function callback(err, response) {
      //         if (err) {
      //           console.log(err);
      //         } else {
      //           res.json({response: response});
      //         }
      //       });
      //     } else {
      //       // err.status = 404;
      //       // res.status(404).response('Not found');
      //       res.json({response: '404'});
      //     }
      //   });
      // } else {
      //   res.json({response: '404'});
      //   // res.send(404);
      // }
    });





module.exports = router;
