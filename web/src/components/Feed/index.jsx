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
      <div className="stream">
        <div className="stream__header">

          <div className="live-status">LIVE</div>

          <ul className="stream-navigation">
            <li className="stream-navigation__item">2016</li>
            <li className="stream-navigation__item">2015</li>
            <li className="stream-navigation__item">2014</li>
          </ul>

        </div>

        <div className="stream__body">
          <div className="stream-post">
            <div className="stream-post__meta">5 months ago</div>
            <div className="stream-body">This is a dummy tweet. Lolz.</div>
          </div>

        </div>
      </div>
    );
  }
});

module.exports = Feed;
