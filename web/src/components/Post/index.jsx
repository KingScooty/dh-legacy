var React = require('react');

var Post = React.createClass({

  getTimeStamp: function () {
    return this.props.timestamp || this.props.created_at;
  },

  getId: function() {
    return this.props.tweet_id || this.props.id_str;
  },

  getScreenName: function() {
    return this.props.screen_name || this.props.user.screen_name;
  },

  getProfileImage: function() {
    return this.props.profile_image_url || this.props.user.profile_image_url;
  },

  render: function() {

    return (
      <div className="stream-post">
        <div className="stream-post__profile-image"><img src={ this.getProfileImage() } /></div>
        <div className="stream-post__meta">{ this.getTimeStamp() }</div>
        <div className="stream-post__body">{this.props.text}</div>
        {/*<div className="stream-media">Media goes here</div>*/}
      </div>
    );
  }
});

module.exports = Post;
