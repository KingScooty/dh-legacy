// var io = require('socket.io')();
var app = require('./app');
var Twit = require('twit');

var config = app.locals.config.twitter;

var T = new Twit({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token: config.access_token,
  access_token_secret: config.access_token_secret
});
//
// io.on('connection', function (socket) {
//
//   var stream = T.stream('statuses/filter', { track: '#digitalheroes2015' });
//
//   stream.on('tweet', function callback(tweet) {
//     db.save(tweet.id_str, tweet, function callback(err, res) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('Tweet ' + tweet.id_str + ' saved to db');
//       }
//     });
//
//     app.io.sockets.emit('incomingTweet', {'tweet': tweet});
//
// });

// module.exports = io;

module.exports = function(server){
  var io = require('socket.io')(server);
  console.log('Init sockets.');
  // catch errors
  io.on('error', function(err){
    throw err;
  });

  var stream = T.stream('statuses/filter', { track: '#digitalheroes2015' });

  stream.on('tweet', function callback(tweet) {
    console.log('SOMEONE TWEETED!');
    app.locals.db.dh_2015.save(tweet.id_str, tweet, function callback(err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log('Tweet ' + tweet.id_str + ' saved to db');
      }
    });

    io.sockets.emit('incomingTweet', {'id': tweet.id_str, 'value': tweet});
  });

  // Set Socket.io listeners by creating a socket.io middleware
  // attachEventlisteners would live in `/controllers`
  // io.use(attachEventlisteners);

  io.sockets.on('connection', function (socket) {
    console.log('SOMEONE IS CONNECTED!');
  });

  return io; // so it can be used in app.js ( if need be )
};
