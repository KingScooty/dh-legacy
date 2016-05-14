'use strict';

import React from 'react';
import moment from 'moment';
import TimeAgo from 'react-timeago';
import twitter from 'twitter-text';

import PostMedia from './PostMedia';

const Post = React.createClass({
  propTypes: {
    screen_name: React.PropTypes.string,
    user: React.PropTypes.object.isRequired,
    timestamp: React.PropTypes.string,
    created_at: React.PropTypes.string,
    tweet_id: React.PropTypes.string,
    id_str: React.PropTypes.string,
    text: React.PropTypes.string.isRequired,
    entities: React.PropTypes.object,
    extended_entities: React.PropTypes.object,
    media: React.PropTypes.string
  },

  getTimeStamp: function (post) {
    return post.timestamp || post.created_at;
  },

  formatTimeStamp: function (timestamp) {
    return moment(timestamp, 'ddd MMM DD HH:mm:SS ZZ YYYY').format('HH:mm a, Do MMM');
  },

  getScreenName: function (post) {
    const screenName = post.screen_name || post.user.screen_name;
    const screenNameObject = {
      text: screenName,
      url: `https://twitter.com/${screenName}`
    };

    return screenNameObject;
  },

  getStatusUrl: function (post) {
    const statusId = post.tweet_id || post.id_str;

    return `https://twitter.com/statuses/${statusId}`;
  },

  getProfileImage: function (screenName) {
    /**
     * Query the puclic Twitter API for the profile image rather than use
     * the stale CDN link in the data:
     * http://stackoverflow.com/a/29699589/155740
     */
    return `https://twitter.com/${screenName}/profile_image?size=bigger`;
  },

  getPostText: function (post) {
    var postBody = twitter.autoLink(twitter.htmlEscape(post.text));

    return {
      dangerouslySetInnerHTML: {
        __html: postBody
      }
    };
  },

  render: function () {
    const post = this.props;

    const screenName = this.getScreenName(post);
    const statusUrl = this.getStatusUrl(post);
    const postText = this.getPostText(post);
    const timestamp = this.getTimeStamp(post);

    const profileImage = this.getProfileImage(screenName.text);
    const timestampFormatted = this.formatTimeStamp(timestamp);

    return (
      <div className="stream-post">

        <div className="stream-post__aside">
          <a href={ statusUrl } target="_blank">
            <TimeAgo className="stream-post__timeago" date={ timestamp } />
          </a>
        </div>

        <div className="stream-post__profile-image">
          <img src={ profileImage } />
        </div>

        <div className="stream-post__screen-name">
          <a href={ screenName.url }>@{ screenName.text }</a>
        </div>

        <div {...postText} className="stream-post__text" />

        <div className="stream-post__timestamp">
          <a href={ statusUrl } target="_blank">{ timestampFormatted }</a>
        </div>

        <PostMedia extended_entities={ this.props.extended_entities } entities={ this.props.entities } media={ this.props.media } href={ statusUrl } />
      </div>
    );
  }
});

module.exports = Post;
