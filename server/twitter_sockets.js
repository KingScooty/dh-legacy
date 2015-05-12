'use strict';

var Twit = require('twit');
var app = require('../app');

var init = function init(config, db) {
  //
  var init_sockets = function init_sockets() {
    app.io.sockets.on('connection', function callback(socket) {
      socket.emit('replyToGreeting', 'connected');
    });
  };

  var twitter_server = function twitter_server() {
    var T = new Twit({
      consumer_key: config.consumer_key,
      consumer_secret: config.consumer_secret,
      access_token: config.access_token,
      access_token_secret: config.access_token_secret
    });

    //
    // filter the public stream
    //

    var stream = T.stream('statuses/filter', { track: '#digitalheroes2014' });

    stream.on('tweet', function callback(tweet) {
      db.save(tweet.id_str, tweet, function callback(err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log('Tweet ' + tweet.id_str + ' saved to db');
        }
      });

      app.io.sockets.emit('incomingTweet', {'tweet': tweet});
    });
  };

  init_sockets();
  twitter_server();
};

module.exports = init;
