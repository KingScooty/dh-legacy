var React = require('react');
var Post = require('../../components/Post');

var ArchiveFeed = React.createClass({

  // getInitialState: function () {
  //
  //   return {
  //     posts: this.props.
  //   };
  // },

  renderPosts: function () {
    return this.props.posts.map(function (post, index) {
      return <Post {...post} key={ index } />;
    });
  },

  render: function () {
    var posts = this.renderPosts();

    console.log(this.props.store);

    return (
      <div>
        <h1>ARCHIVE FEED!</h1>
        { posts }
      </div>
    );
  }
});

module.exports = ArchiveFeed;
