const React = require('react');
import { connect } from 'react-redux';

var Post = require('../../components/Post');

var ArchiveFeed = React.createClass({
  propTypes: {
    posts: React.PropTypes.array.isRequired
  },

  renderPosts: function () {
    return this.props.posts.map(function (post, index) {
      return <Post {...post} key={ index } />;
    });
  },

  render: function () {
    var posts = this.renderPosts();

    return (
      <div>
        <h1>ARCHIVE FEED!</h1>
        { posts }
      </div>
    );
  }
});

var mapStateToProps = function (state) {
  return { posts: state.posts};
};

// module.exports = ArchiveFeed;
module.exports = connect(mapStateToProps)(ArchiveFeed);
