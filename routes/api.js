'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function callback(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

module.exports = router;
