module.exports.twitterServer = function (settings, db, io) {

  var Twit = require('twit')

  var T = new Twit({
    consumer_key: settings.twitter.consumer_key,
    consumer_secret: settings.twitter.consumer_secret,
    access_token: settings.twitter.access_token,
    access_token_secret: settings.twitter.access_token_secret
  });

  //
  // filter the public stream
  //

  var stream = T.stream('statuses/filter', { track: '#digitalheroes2014' })

  stream.on('tweet', function (tweet) {
    // console.log(tweet)
    // console.log('Logging media');
    // console.log('ENTITIES: ');
    // console.log(tweet.entities);
    // console.log('HASHTAGS: ');
    // console.log(tweet.entities.hashtags);
    // console.log('SYMBOLS: ');
    // console.log(tweet.entities.symbols);

    db.save(tweet.id_str, tweet, function (err, res) {
      if (err) return done(err);
      console.log('Tweet '+ tweet.id_str +' saved to db');
    });

    io.sockets.emit('incomingTweet', {'tweet': tweet});

  });

}
