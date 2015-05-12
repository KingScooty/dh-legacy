/** @jsx React.DOM */

var React  = require('react');
var Router = require('react-router');
var Reqwest = require('reqwest');
var classNames = require('classnames');

var StreamItem = require('./StreamItem.jsx');
var SocketFeed = require('./SocketFeed.jsx');
var Loading = require('./Loading.jsx');
// var StreamItemLegacy = require('./StreamItemLegacy.jsx');

var Stream = React.createClass({
  mixins: [ Router.State ],

  getInitialState: function() {
    return {
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
    console.log('> componentWillMount()');
  },

  componentDidMount: function () {
    console.log('> componentDidMount');
    if (this.isMounted()) {
      this.readTweetsFromAPI();
    }
  },

  componentWillReceiveProps: function (nextProps) {
    console.log('> componentWillReceiveProps');
    if (this.isMounted()) {
      this.readTweetsFromAPI();
    }
  },

  // handleChange: function (e) {
      // console.log(e.target.value);
      // this.setState({user: e.target.value});
  // },

  // shouldComponentUpdate: function (nextProps, nextState) {
  //     console.log('> shouldComponentUpdate(nextProps, nextState)');
  //     console.log('  nextProps: ' + JSON.stringify(nextProps));
  //     console.log('  nextState: ' + JSON.stringify(nextState));
  //     return true; /* need return true/false */
  // },
  componentWillUpdate: function (nextProps, nextState) {
    console.log('> componentWillUpdate');
    // this.readTweetsFromAPI();
  },
  componentWillUnmount: function () {
    console.log('> componentWillUnmount()');
  },

  readTweetsFromAPI: function() {
    this.readFromAPI(this.getPath(), function(tweets) {
      this.setState({data: tweets});
    }.bind(this));
  },

  // componentWillMount: function() {
    // console.log('TRIGGER API READ');
    // this.readTweetsFromAPI();
  // },

  // componentDidMount: function() {
  //   this.readTweetsFromAPI();
  // },

  // shouldComponentUpdate: function() {
  // },

  // componentWillUpdate: function() {
  //   this.readTweetsFromAPI();
  // },

  // componentWillReceiveProps: function() {
    // console.log('TRIGGER API READ');
    // this.readTweetsFromAPI();
  // },

  render: function() {
    var path = this.getPath();
    var socket_feed;

    console.log(this.state.data);

    if (this.state.data) {
      var tweetItems = this.state.data.map(function(tweet, index) {
        return <StreamItem key={tweet.id} tweet={tweet}/>
      }.bind(this));

      return (
        <div className="tweet-list__archive">
          {tweetItems}
        </div>
      );
    } else {
      return <Loading />;
    }
  }

});

module.exports = Stream;
