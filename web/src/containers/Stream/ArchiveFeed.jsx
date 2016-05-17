var React = require('react');
var Post = require('../../components/Post');
import { connect } from 'react-redux';

var ArchiveFeed = React.createClass({

  // getInitialState: function () {
  //
  //   return {
  //     posts: this.props.
  //   };
  // },

  renderPosts: function () {
    return this.state.posts.map(function (post, index) {
      return <Post {...post} key={ index } />;
    });
  },

  render: function () {
    var posts = this.renderPosts();

    console.log(this.state.store);

    return (
      <div>
        <h1>ARCHIVE FEED!</h1>
        { posts }
      </div>
    );
  }
});

var mapStateToProps = function(state) {
  return { posts: state.posts};
}

// module.exports = ArchiveFeed;
module.exports = connect(mapStateToProps)(ArchiveFeed);
