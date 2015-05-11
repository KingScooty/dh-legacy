var React = require('react');
var Router = require('react-router');
var moment = require('moment');

var StreamItemMedia = require('./StreamItemMedia.jsx');

// var DefaultRoute = Router.DefaultRoute;
// var Link = Router.Link;
// var Route = Router.Route;
// var RouteHandler = Router.RouteHandler;

var StreamItem = React.createClass({
  mixins: [ Router.State ],

  render: function() {
    // console.log('PATH - ', this.getPath());
    // console.log(this.props.tweet);
    // 2012 DH DATABASE
    // "_id": "207933355151458300",
    // "_rev": "1-36d7dad905efc46b83def9553078f279",
    // "tweet_id": 207933355151458300,
    // "screen_name": "KingScooty",
    // "text": "@AlanBithell Testing persistent storage. #digitalheroes2012",
    // "profile_image_url": "http://a0.twimg.com/profile_images/1427254999/profile-picture_normal.jpg",
    // "timestamp": "Wed May 30 20:35:49 +0000 2012",
    // "media": ""
    var tweet = this.props.tweet.value;
    var tweet_id;
    var screen_name;
    var created_at;
    var tweet_text;
    var time_ago;
    var profile_image;
    var screen_name_href;
    var tweet_href;
    var media;

    if (this.getPath() !== '/2014/') {
      tweet_id = tweet.tweet_id;
      screen_name = tweet.screen_name;
      created_at = tweet.timestamp;
      profile_image = tweet.profile_image_url;
      media = tweet.media;
    } else {
      tweet_id = tweet.id_str;
      screen_name = tweet.user.screen_name;
      created_at = tweet.created_at;
      profile_image = tweet.user.profile_image_url;
      media = tweet.entities.media;
    }

    tweet_text = tweet.text;
    // moment(Date.parse(created_at))
    time_ago = moment(Date.parse(created_at)).fromNow();

    screen_name_href = "http://twitter.com/" + screen_name;
    tweet_href = "https://twitter.com/" + screen_name + '/status/' + tweet_id;

    console.log(screen_name);

    if (profile_image) {
      profile_image = profile_image.replace("normal", "200x200");
    }

    return (

      <div className="tweet">

        <div className="tweet__container">
          <div className="tweet__profile_picture">
            <img src={profile_image} />
          </div>
          <div className="tweet__screen_name">
            <a href={screen_name_href}>@{screen_name}</a>
          </div>

          <div className="tweet__body">{tweet_text}</div>

          <div className="tweet__meta">
            <a href={tweet_href}>
              <time className="tweet__time timeago" dateTime="{created_at}">
                {time_ago}
              </time>
            </a>
          </div>
        </div>

        {media ? (
          <div>
            <StreamItemMedia media={media} tweet_href={tweet_href} />
          </div>
        ) :
        null}
      </div>

    );
  }

});

module.exports = StreamItem;
