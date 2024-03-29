var React = require('react');
var Router = require('react-router');
var moment = require('moment');
var AutoupdateTime = require('react-autoupdate-time');
var twitter = require('twitter-text');

var StreamItemMedia = require('./StreamItemMedia.jsx');
var StreamItemVine = require('./StreamItemVine.jsx');

var StreamItem = React.createClass({
  mixins: [ Router.State ],

  componentDidMount: function () {
    var self = this;
    var img = new Image();

    // Replace 404 images with a default image.
    img.onerror = function () {
      // 404 image.
      self.setState({ profile_img_src: '/images/icon__twitter.png' });
    };

    img.src = this.state.profile_img_src;
  },

  getInitialState: function () {
    var profile_image;

    // Catch 404 images for newer feeds.
    // Replace profile images by default for older feeds.
    if ((this.getPath() === '/2012') || this.getPath() === '/2013') {
      profile_image = '/images/icon__twitter.png';
    } else {
      profile_image = this.props.tweet.value.user.profile_image_url;
    }

    return { profile_img_src: profile_image };
  },

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
    var extended_entities;
    var timestamp;
    var tweet_source;
    var vine;
    var entities;

    if (this.props.tweet.value) {

      tweet = this.props.tweet.value;

      if ((this.getPath() === '/2012') || this.getPath() === '/2013') {
        tweet_id = tweet.tweet_id;
        screen_name = tweet.screen_name;
        created_at = tweet.timestamp;
        profile_image = tweet.profile_image_url;
        media = tweet.media;
      } else {
        if (this.props.tweet.value.user) {
          tweet_id = tweet.id_str;
          screen_name = tweet.user.screen_name;
          created_at = tweet.created_at;
          profile_image = tweet.user.profile_image_url;
          media = tweet.entities.media;
          extended_entities = tweet.extended_entities;

          entities = tweet.entities;
          tweet_source = tweet.source;
          vine = tweet_source.indexOf('vine') > -1;
        }
      }

      tweet_text = twitter.autoLink(twitter.htmlEscape(tweet.text));
      var time_object = moment(created_at, "ddd MMM DD HH:mm:SS ZZ YYYY");

      // time_ago = moment(Date.parse(created_at)).fromNow();
      // timestamp = moment(Date.parse(created_at)).format("hh:mm a, Mo MMM");
      // timestamp = moment(Date.parse(created_at)).format("HH:mm a, Mo MMM");
      // moment("Sat Jun 02 05:02:34 +0000 2012", "ddd MMM DD HH:mm:SS ZZ YYYY").format("Do MMM");

      time_ago = time_object.fromNow();
      timestamp = time_object.format("HH:mm a, Do MMM");

      tweet_href = "https://twitter.com/" + screen_name + '/status/' + tweet_id;
      screen_name_href = "http://twitter.com/" + screen_name;

      if (profile_image) {
        profile_image = profile_image.replace("normal", "200x200");
      }

    }

    return (
      <div className="tweet">

        <div className="tweet__container">
          <div className="tweet__profile_picture">
            <img src={this.state.profile_img_src} />
          </div>
          <div className="tweet__screen_name">
            <a href={screen_name_href}>@{screen_name}</a>
          </div>

          <div className="tweet__body">
            <div dangerouslySetInnerHTML={{__html: tweet_text}}></div>
            <div className="tweet__body__footer">{timestamp}</div>
          </div>

          <div className="tweet__meta">
            <a href={tweet_href}>
              <AutoupdateTime className="tweet_time timeago" value={created_at} />
            </a>
          </div>
        </div>

        {media ? (
          <div>
            <StreamItemMedia media={media} extended_entities={extended_entities} tweet_href={tweet_href} />
          </div>
        ) :
        null}

        {vine ? (
          <div>
            <StreamItemVine entities={entities} />
          </div>
        ) :
        null}
      </div>

    );
  }

});

module.exports = StreamItem;
