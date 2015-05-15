/** @jsx React.DOM */

var React         = require('react/addons'); //,
var io            = require('socket.io-client');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var StreamItem = require('./StreamItem.jsx');

var SocketFeed = React.createClass({

  getInitialState: function() {
    return {
      connected: false,
      tweets: []
    }
  },

  connectToSockets: function() {
    // console.log('Connect to sockets init!');
    var self = this;
    // var socket = io('http://localhost/');
    var socket = io.connect({
      multiplex: false
    });

    socket.on('connect', function() {
      // console.log('connected!');
      socket.on('incomingTweet', function(tweet) {
        // console.log(tweet);
        // console.log(self.state.tweets);

        var newArray = self.state.tweets.slice();
        newArray.push(tweet);
        self.setState({tweets:newArray.reverse()});

        // console.log(self.state.tweets);
      });
      self.setState({connected: true });
      self.props.enableSocketState();
    });
  },

  // Called each time componented is mounted
  // componentWillMount: function () {
  //   console.log('> componentWillMount()');
  // },

  // Called once first time mounted and cached until there are changes
  componentDidMount: function() {
    this.connectToSockets();
  },

  // componentWillReceiveProps: function(){
  // },

  // Called each time the component is unmounted
  componentWillUnmount: function () {
      console.log('> componentWillUnmount()');
  },

  render: function() {
    // console.log('hello props?');
    // console.log(this.props.data);
    // console.log(this.props.connected);
    // console.log(this.state.tweets);

    if (this.state.connected) {
      if (this.state.tweets.length !== 0) {
        // console.log('tweets updated', this.state.tweets);
        var tweetItems = this.state.tweets.map(function(tweet, index) {
          // console.log('looping');
          return <StreamItem key={tweet.id} tweet={tweet}/>
        }.bind(this));
      }

      var socket_component = (
        <div className="tweet-list__live">

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

    return (
      <ReactCSSTransitionGroup transitionName="fade">
        {tweetItems}
      </ReactCSSTransitionGroup>
    );
  }

});

module.exports = SocketFeed;
