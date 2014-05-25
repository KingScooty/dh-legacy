module.exports.twitterServer = function (settings) {

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
    console.log('Logging media');
    console.log(tweet.entities.media);
    console.log(tweet.entities.media[0]);
  });

}