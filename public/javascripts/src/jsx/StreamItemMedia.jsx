var React = require('react');

var StreamItemMedia = React.createClass({

  render: function() {

    // var screen_name = this.props.tweet.value.user.screen_name;
    // var tweet_id = this.props.tweet.value.id_str;
    // var tweet_href = "https://twitter.com/" + screen_name + '/status/' + tweet_id;

    // var media_url;
    var media = this.props.media;
    var tweet_media_img;
    var media_replace;

    if (typeof media === 'string') {
      if (media.indexOf(".com/media/") === -1) {
        media = this.props.media.replace(".com/", ".com/media/")
      }
      tweet_media_img = <img className="tweet__media" src={media} />
    } else {
      tweet_media_img = this.props.media.map(function(media, index) {
        return <img key={index} className="tweet__media" src={media.media_url} />
      });
    }

    return (
      <div className="tweet__entities">
        <a href={this.props.tweet_href}>
          {tweet_media_img}
        </a>
      </div>
    );
  }

});

module.exports = StreamItemMedia;
