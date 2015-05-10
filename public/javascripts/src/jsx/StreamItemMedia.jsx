var React = require('react');

var StreamItemMedia = React.createClass({

  render: function() {

    var screen_name = this.props.tweet.value.user.screen_name;
    var tweet_id = this.props.tweet.value.id_str;
    var tweet_href = "https://twitter.com/" + screen_name + '/status/' + tweet_id;

    var tweet_media_img = this.props.tweet.value.entities.media.map(function(media) {
      return <img className="tweet__media" src={media.media_url} />
    });

    return (
      <div className="tweet__entities">
        <a href={tweet_href}>
          {tweet_media_img}
        </a>
      </div>
    );
  }

});

module.exports = StreamItemMedia;
