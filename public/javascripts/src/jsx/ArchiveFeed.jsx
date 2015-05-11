/** @jsx React.DOM */

var React         = require('react');
var Router = require('react-router');

var StreamItem = require('./StreamItem.jsx');
var SocketFeed = require('./SocketFeed.jsx');
// var StreamItemLegacy = require('./StreamItemLegacy.jsx');

var Stream = React.createClass({
  mixins: [ Router.State ],

  // componentDidMount: function() {
  //   this.props.readTweetsFromAPI();
  // },

  render: function() {
    var path = this.getPath();
    var socket_feed;

    var tweetItems = this.props.data.map(function(tweet, index) {
      return <StreamItem key={index} tweet={tweet}/>
    }.bind(this));

    // if (path === '/2015/') {
    //   socket_feed = <SocketFeed connected={this.props.connected}/>
    // }

    return (
      <div className="tweet-list__archive">
        {tweetItems}
      </div>
    );
  }

});

module.exports = Stream;
