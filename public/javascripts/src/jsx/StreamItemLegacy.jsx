var React = require('react');
var Router = require('react-router');
var moment = require('moment');

var StreamItemMedia = require('./StreamItemMedia.jsx');

var StreamItemLegacy = React.createClass({
  mixins: [ Router.State ],

  componentDidMount: function () {

      // var self = this;
      // var img = new Image();
      // img.onerror = function () {
      //   self.setState({ src: '/404image.jpg' });
      // };
      //
      // // img.src = this.state.src;
      // if (this.getPath() !== '/2014/') {
      //   profile_image = tweet.profile_image_url;
      // } else {
      //   profile_image = tweet.profile_image_url;
      //   profile_image = tweet.user.profile_image_url;
      // }
      // img.src = this.props.tweet.value

  },

  // getInitialState: function () {
  //   return { img_src: '/the_real_image.jpg' };
  // },

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

    var tweet_id = tweet.tweet_id;
    var screen_name = tweet.screen_name;
    var created_at = tweet.timestamp;
    var profile_image = tweet.profile_image_url;
    var media = tweet.media;

    var tweet_text = tweet.text;
    var time_ago = moment(Date.parse(created_at)).fromNow();

    var screen_name_href = "http://twitter.com/" + screen_name;
    var tweet_href = "https://twitter.com/" + screen_name + '/status/' + tweet_id;

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

module.exports = StreamItemLegacy;
