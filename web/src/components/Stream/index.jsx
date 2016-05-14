var React = require('react');
var Post = require('../Post');
var Navigation = require('../Navigation');

var Stream = React.createClass({
  propTypes: {
    posts: React.PropTypes.array.isRequired
  },

  getPosts: function () {
    return this.props.posts.map(function(post, index) {
      return (
        <Post {...post} key={index} />
      )
    });
  },

  render: function () {

    var Posts = this.getPosts();

    return (
      <div id="stream" className="stream">
        <div className="stream__header">

          <div className="live-status">LIVE</div>

          <Navigation />
        </div>

        <div className="stream__body">
          {Posts}
        </div>
      </div>
    );
  }
});

module.exports = Stream;
