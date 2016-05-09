import React from 'react';
import TimeAgo from 'react-timeago';
import twitter from 'twitter-text';

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
    /**
     * Query the puclic Twitter API for the profile image rather than use
     * the stale CDN link in the data:
     * http://stackoverflow.com/a/29699589/155740
     */
    return `https://twitter.com/${this.getScreenName().text}/profile_image?size=bigger`;
  },

  getPostText: function() {
    var postBody = twitter.autoLink(twitter.htmlEscape(this.props.text));

    return {
      dangerouslySetInnerHTML: {
        __html : postBody
      }
    }
  },

  render: function() {
    var postText = this.getPostText();

    return (
      <div className="stream-post">

        <div className="stream-post__aside">
          <TimeAgo className="stream-post__timeago" date={ this.getTimeStamp() } />
        </div>

        <div className="stream-post__profile-image">
          <img src={ this.getProfileImage() } />
        </div>

        <div className="stream-post__screen-name">
          <a href={ this.getScreenName().url }>@{ this.getScreenName().text }</a>
        </div>

        {/*<div className="stream-post__body">*/}
        <div {...postText} className="stream-post__text" />
        {/*<div {...} className="stream-post__timestamp" />*/}
        {/*</div>*/}

        {/*<PostMedia extended_entities={this.props.extended_entities} entities={this.props.entities} media={this.props.media} href="" />*/}
      </div>
    );
  }
});

module.exports = Post;
