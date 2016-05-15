var React = require('react');
var Post = require('../Post');
var Navigation = require('../Navigation');

var Stream = React.createClass({
  propTypes: {
    // posts: React.PropTypes.array.isRequired
  },

  getPosts: function () {
    return this.props.posts.map(function (post, index) {
      return (
        <Post {...post} key={ index } />
      );
    });
  },

  // getActiveFeeds: function () {
  //   return this.props.children.map(function(feed, index) {
  //     return (
  //       { feed }
  //     );
  //   });
  // },

  render: function () {
    // var Posts = this.getPosts();
    // const { live, archive } = this.props.children;
    var { live, archive } = this.props;

    return (
      <div id="stream" className="stream">
        <div className="stream__header">

          <div className="live-status">LIVE</div>

          <Navigation />
        </div>

        <div className="stream__body">
          { live }
          { archive }
        </div>
      </div>
    );
  }
});

module.exports = Stream;
