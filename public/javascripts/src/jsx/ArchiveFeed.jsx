/** @jsx React.DOM */

var React         = require('react');
var Router = require('react-router');

var StreamItem = require('./StreamItem.jsx');
// var ToggleYear    = require('./ToggleYear.jsx');
// var io            = require('socket.io-client');
    // FeedForm      = require('./FeedForm'),
    // FeedList      = require('./FeedList'),
    // _             = require('lodash');

var Stream = React.createClass({
  mixins: [ Router.State ],

  // componentWillUpdate: function() {
  //   console.log('component will update');
  // },
  // getInitialState: function() {
  //   return {
  //     tweets: [], //new FIFO(25, this.props.tweets),
  //     newTweets: [],
  //     data: []
  //   }
  // },

  // getInitialState: function() {
  //   var FEED_ITEMS = [
  //     { key: '1', title: 'Realtime data!', description: 'Firebase is cool', voteCount: 49},
  //     { key: '2', title: 'JavaScript is fun', description: 'Lexical scoping FTW', voteCount: 34},
  //     { key: '3', title: 'Coffee makes you awake', description: 'Drink responsibly', voteCount: 15}
  //   ];
  //   return {
  //     items: FEED_ITEMS,
  //     formDisplayed : false
  //   }
  // },
  //
  // getInitialState: function() {
  //   return {
  //     // tweets: new FIFO(25, this.props.tweets),
  //     newTweets: []
  //   }
  // },
  //
  // componentDidMount: function() {
  //   var socket = io();
  //   var self = this;
  //
  //   socket.on('tweet', function(tweet) {
  //     var tweets = self.state.newTweets
  //     tweets.unshift(tweet)
  //     self.setState({
  //       tweets: self.state.tweets,
  //       newTweets: tweets
  //     })
  //   })
  // },

  // onToggleForm: function () {
  //   this.setState({
  //     formDisplayed: !this.state.formDisplayed
  //   });
  // },
  // onNewItem: function(newItem) {
  //   var newItems = this.state.items.concat([newItem]);
  //   this.setState({
  //     items: newItems,
  //     formDisplayed: false,
  //     key: this.state.items.length
  //   });
  // },

  // onVote: function(item) {
  //   var items = _.uniq(this.state.items);
  //   var index = _.findIndex(items, function(feedItems) {
  //     return feedItems.key === item.key;
  //   });
  //   var oldObj = items[index];
  //   var newItems = _.pull(items, oldObj);
  //   newItems.push(item);
  //   this.setState({
  //     items: newItems
  //   });
  // },


  render: function() {
    // var name = this.getParams().name;
    var path = this.getPath();
    // console.log('hello props?');
    // console.log(this.props.data);

    var tweetItems = this.props.data.map(function (tweet) {
      return <div><StreamItem tweet={tweet}/></div>
    }.bind(this));

    return (
      <div>
        <div>Archive that shit - {path}</div>
        {tweetItems}
      </div>
      // <StreamList items={this.state.items} />
      // <div>
      //
      //   <div className="container">
      //     <ShowAddButton displayed={this.state.formDisplayed} onToggleForm={this.onToggleForm} />
      //   </div>
      //
      //   <FeedForm displayed={this.state.formDisplayed} onNewItem={this.onNewItem} />
      //   <br />
      //   <br />
      //
      //   <FeedList items={this.state.items} onVote={this.onVote} />
      //
      // </div>

    );
  }

});

module.exports = Stream;
