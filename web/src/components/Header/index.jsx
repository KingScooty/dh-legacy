var React = require('react');

var Feed = React.createClass({
  getFeed: function () {
    return (
      <h1>HELLO!!!</h1>
    );
  },

  render: function () {
    var feed = this.getFeed();

    return (
      <div>
        {feed}
      </div>
    );
  }
});

module.exports = Feed;
