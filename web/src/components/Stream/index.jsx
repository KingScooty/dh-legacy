var React = require('react');
var Post = require('../Post');

var Stream = React.createClass({

  getPosts: function() {
    return this.props.posts.map(function(post, index) {
      return (
        <Post {...post} key={index} />
      )
    });
  },

  render: function() {

    var Posts = this.getPosts();

    return (
      <div id="stream" className="stream">
        <div className="stream__header">

          <div className="live-status">LIVE</div>

          <ul className="stream-navigation">
            <li className="stream-navigation__item">2016</li>
            <li className="stream-navigation__item">2015</li>
            <li className="stream-navigation__item">2014</li>
          </ul>

        </div>

        <div className="stream__body">
          {Posts}
        </div>
      </div>
    );
  }
});

module.exports = Stream;
