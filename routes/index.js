'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  // res.render('index', { title: 'Express' });

  res.format({
    text: function(){
      res.send('hey');
    },

    html: function(){
      // res.send('<strong>hey</strong>');
      res.render('index', { title: 'Express' });
    },

    json: function(){
      res.send({ message: 'hey' });
    }
  });
});

router.get('/:year', function(req, res) {
  // res.render('index', { title: 'Express' });
  var db = req.db['dh_' + req.params.year];
  // var payload;

  try {
    db.view('tweets/all', function callback(err, response) {
      if (err) {
        console.log(err);
      } else {
        // res.json(response);
        // payload = response;
        res.format({
          text: function(){
            res.send('hey');
          },

          html: function(){
            // res.send('<strong>hey</strong>');
            res.render('index', { title: 'Express' });
            // res.json(response);
          },

          json: function(){
            res.send(response);
          }
        });

      }
    });
  } catch (exeception) {
    res.redirect('/');
    // res.send(404);
    // res.json({response: '404'});
  }
});

// router.get('/:year', function(req, res) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
