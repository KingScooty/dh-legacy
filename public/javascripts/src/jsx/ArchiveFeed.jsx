/** @jsx React.DOM */

var React         = require('react');
var Router = require('react-router');

var StreamItem = require('./StreamItem.jsx');

var Stream = React.createClass({
  mixins: [ Router.State ],

  render: function() {
    // var path = this.getPath();

    var tweetItems = this.props.data.map(function (tweet) {
      return <StreamItem tweet={tweet}/>
    }.bind(this));

    return (
      <div className="tweet-list">
        {tweetItems}
      </div>

    );
  }

});

module.exports = Stream;
