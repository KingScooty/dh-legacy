var React = require('react');
var Post = require('../Post');

var Stream = React.createClass({

  getStream: function() {
    return (
      <h2>Stream:</h2>
    )
  },

  render: function() {
    postData = {
      title: "This is a dummy tweet",
      date: "5 months ago"
    };
    // var stream = this.getStream();

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
          <Post {...postData} />
          <Post {...postData} />
          <Post {...postData} />
          <Post {...postData} />
        </div>
      </div>
    );
  }
});

module.exports = Stream;
