/** @jsx React.DOM */

var React         = require('react'); //,
var io            = require('socket.io-client');

var Stream = React.createClass({

  // Invoked once before the component is mounted.
  // The return value will be used as the initial value of this.state.
  // getInitialState: function() {
  //   return {
  //     tweets: [], //new FIFO(25, this.props.tweets),
  //     newTweets: [],
  //     data: []
  //   }
  // },

  componentDidMount: function() {
    // var socket = io();
    // var self = this;
    //
    // socket.on('tweet', function(tweet) {
    //   var tweets = self.state.newTweets
    //   tweets.unshift(tweet)
    //   self.setState({
    //     tweets: self.state.tweets,
    //     newTweets: tweets
    //   })
    // })
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
    console.log('hello props?');
    console.log(this.props.data);

    return (
      <div class="tweet-list__live">

        <div className="tweet">

          <div className="tweet__container">
            <div className="tweet__profile_picture">
              <img src="" />
            </div>
            <div className="tweet__screen_name">
              <a href="/"></a>
            </div>

            <div className="tweet__body">This is a body of text tweet for testing out sockets</div>

            <div className="tweet__meta">
              <a href="#">
                <time className="tweet__time timeago" dateTime="{created_at}">
                  5 seconds ago
                </time>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Stream;
