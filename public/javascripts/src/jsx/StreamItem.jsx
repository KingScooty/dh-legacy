var React = require('react');
var moment = require('moment');

var StreamItemMedia = require('./StreamItemMedia.jsx');

var StreamItem = React.createClass({

  render: function() {


    // var positiveNegativeClassName = this.props.voteCount >= 0 ?
    //                                 'label label-success pull-right' :
    //                                 'label label-danger pull-right';

    var tweet_text = this.props.tweet.value.text;
    var created_at = this.props.tweet.value.created_at;
    var time_ago = moment(created_at).fromNow();
    var screen_name = this.props.tweet.value.user.screen_name;
    var tweet_id = this.props.tweet.value.id_str;
    var profile_image = this.props.tweet.value.user.profile_image_url;

    profile_image = profile_image.replace("normal", "200x200");

    var screen_name_href = "http://twitter.com/" + screen_name;
    var tweet_href = "https://twitter.com/" + screen_name + '/status/' + tweet_id;

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

        {this.props.tweet.value.entities.media ? (
          <div>
            <StreamItemMedia tweet={this.props.tweet} />
          </div>
        ) :
        null}
      </div>

    );
  }

});

module.exports = StreamItem;
