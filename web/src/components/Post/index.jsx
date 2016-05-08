import React from 'react';
import TimeAgo from 'react-timeago';

import PostMedia from './PostMedia';

const Post = React.createClass({

  getTimeStamp: function () {
    return this.props.timestamp || this.props.created_at;
    // return new Date(Date.parse(timestamp));
  },

  getId: function() {
    return this.props.tweet_id || this.props.id_str;
  },

  getScreenName: function() {
    var screenName = this.props.screen_name || this.props.user.screen_name;
    var screenNameObject = {
      'text': screenName,
      'url': `https://twitter.com/${screenName}`
    }
    return screenNameObject;
  },

  getProfileImage: function() {
    return this.props.profile_image_url || this.props.user.profile_image_url;
  },

  render: function() {

    return (
      <div className="stream-post">
        <div className="stream-post__profile-image"><img src={ this.getProfileImage() } /></div>
        <div className="stream-post__screen-name">
          <a href={ this.getScreenName().url }>@{ this.getScreenName().text }</a>
        </div>
        <div className="stream-post__meta">
          <TimeAgo date={ this.getTimeStamp() } />
        </div>
        <div className="stream-post__body">{ this.props.text }</div>

        {/*<PostMedia extended_entities={this.props.extended_entities} entities={this.props.entities} media={this.props.media} href="" />*/}
      </div>
    );
  }
});

module.exports = Post;
