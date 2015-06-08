var React = require('react');
var Router = require('react-router');

var StreamItemMedia = React.createClass({
  mixins: [ Router.State ],

  render: function() {

    // var screen_name = this.props.tweet.value.user.screen_name;
    // var tweet_id = this.props.tweet.value.id_str;
    // var tweet_href = "https://twitter.com/" + screen_name + '/status/' + tweet_id;

    // var media_url;
    var media = this.props.media;
    var tweet_media_img;
    var media_replace;

    var path = this.getPath()

    switch (path) {

      case '/2012':
        media = this.props.media.replace(".com/", ".com/media/");
        tweet_media_img = <img className="tweet__media" src={media} />
        break;

      case '/2013':
        tweet_media_img = <img className="tweet__media" src={media} />
        break;

      case '/2014':
        tweet_media_img = this.props.media.map(function(media, index) {
          return <img key={index} className="tweet__media" src={media.media_url} />
        });
        break;

      // 2015 and beyond... (provided Twitter don't change the API... again.)
      default:
        tweet_media_img = this.props.extended_entities.media.map(function(media, index) {
          return <img key={index} className="tweet__media" src={media.media_url} />
        });
        break;
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
