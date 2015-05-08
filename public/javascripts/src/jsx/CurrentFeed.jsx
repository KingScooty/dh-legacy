/** @jsx React.DOM */

var React         = require('react'); //,
var io            = require('socket.io-client');

var Status        = require('./Status.jsx');

var Stream = React.createClass({

  // Invoked once before the component is mounted.
  // The return value will be used as the initial value of this.state.
  getInitialState: function() {
    return {
      // tweets: new FIFO(25, this.props.tweets),
      newTweets: []
    }
  },

  componentDidMount: function() {
    var socket = io();
    var self = this;

    socket.on('tweet', function(tweet) {
      var tweets = self.state.newTweets
      tweets.unshift(tweet)
      self.setState({
        tweets: self.state.tweets,
        newTweets: tweets
      })
    })
  },

  // onToggleForm: function () {
  //   this.setState({
  //     formDisplayed: !this.state.formDisplayed
  //   });
  // },

  onToggle: function() {

  },

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
    return (
      <div>
        <Status onToggle={this.onToggle} />
        <div>Current shit. Start shouting!</div>
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
