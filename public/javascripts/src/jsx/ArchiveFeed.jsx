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
    // var tweetItems;

    // if ((path === '/2013/') || (path === '/2012/')) {
    //   tweetItems = this.props.data.map(function(tweet, index) {
    //     return <StreamItemLegacy key={index} tweet={tweet}/>
    //   }.bind(this));
    // } else {
    var tweetItems = this.props.data.map(function(tweet, index) {
      return <StreamItem key={index} tweet={tweet}/>
    }.bind(this));
    // }

    // if (!this.props.data){
    //   return <h1 className="spinner">Loading...</h1>
    // }

    return (
      <div>
        <SocketFeed connection={this.props.connection}/>
        <div className="tweet-list__archive">
          {tweetItems}
        </div>
      </div>

    );
  }

});

module.exports = Stream;
