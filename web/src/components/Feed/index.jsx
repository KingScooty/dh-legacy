var React = require('react');

var Feed = React.createClass({

  getFeed: function() {
    return (
      <h2>Feed:</h2>
    )
  },

  render: function() {

    var feed = this.getFeed();

    return (
      <div>
        {feed}
      </div>
    );
  }
});

module.exports = Feed;
