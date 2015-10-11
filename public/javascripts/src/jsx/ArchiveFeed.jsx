/** @jsx React.DOM */

var React  = require('react');
var Router = require('react-router');
var Reqwest = require('reqwest');
// var classNames = require('classnames');

var StreamItem = require('./StreamItem.jsx');
// var SocketFeed = require('./SocketFeed.jsx');
// var Loading = require('./Loading.jsx');
// var StreamItemLegacy = require('./StreamItemLegacy.jsx');

var Stream = React.createClass({
  mixins: [ Router.State ],

  getInitialState: function() {
    return {
      // class: 'tweet-list__archive tweet-list__archive--inactive',
      data: null
      // data: [
      //   {
      //     value: {
      //       tweet_id: '',
      //       id_str: '',
      //       screen_name: '',
      //       timestamp: '',
      //       text: '',
      //       profile_image_url: '',
      //       created_at: '',
      //       media: '',
      //       user: {
      //         screen_name: '',
      //         profile_image_url: ''
      //       },
      //       entities: {
      //         media: []
      //       }
      //     }
      //   }
      // ]
    }
  },

  readFromAPI: function(url, successFunction) {
    Reqwest({
      url: url,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: successFunction,
      error: function(error) {
        console.error(url, error['response']);
        location = '/';
      }
    });
    console.log('read api called');
  },

  componentWillMount: function () {
    // console.log('> componentWillMount()');
    this.readTweetsFromAPI();
  },

  componentDidMount: function () {
    // console.log('DID MOUNT. RUN EVERY ROUTE??');
  },

  componentWillReceiveProps: function (nextProps) {
    // console.log('> componentWillReceiveProps');
  },

  componentWillUpdate: function (nextProps, nextState) {
    // console.log('> componentWillUpdate');
    // this.readTweetsFromAPI();
  },
  componentWillUnmount: function () {
    // console.log('> componentWillUnmount()');
  },

  readTweetsFromAPI: function() {
    var self = this;

    this.readFromAPI(this.getPath() + '/tweets', function(tweets) {
      setTimeout(function() {
        self.setState({
          data: tweets
        });
        self.props.fadeInPage();
      // Can't remember why i have this .3s delay.
      // Potentially to delay the feed loading in, to create artificial progress
      }, 300);

    }.bind(this));
  },

  render: function() {
    var path = this.getPath();
    var socket_feed;

    // console.log(this.state.data);

    if (this.state.data) {
      var tweetItems = this.state.data.map(function(tweet, index) {
        return <StreamItem key={tweet.id} tweet={tweet}/>
      }.bind(this));
    }

    return (
      <div className="tweet-list__archive">
        {tweetItems}
      </div>
    );
    // } else {
    //   return <Loading />;
    // }
  }

});

module.exports = Stream;
