/** @jsx React.DOM */

var React         = require('react'); //,
var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var Reqwest = require('reqwest');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var ToggleYear    = require('./ToggleYear.jsx');

var Feed = React.createClass({
  mixins: [ Router.State ],
  // Invoked once before the component is mounted.
  // The return value will be used as the initial value of this.state.
  getInitialState: function() {
    return {
      tweets: [], //new FIFO(25, this.props.tweets),
      newTweets: [],
      data: null
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

  readTweetsFromAPI: function() {
    this.readFromAPI(this.getPath(), function(tweets) {
      // console.log('call this api?');
      // console.log(this.getPath());
      // console.log(tweets);
      this.setState({data: tweets});
    }.bind(this));
  },

  componentDidMount: function() {
    this.readTweetsFromAPI();
  },

  componentWillUpdate: function() {
    // console.log('component will update');
    // this.readTweetsFromAPI();
  },

  componentWillReceiveProps: function() {
    // force loading render per route change
    this.setState({data: null});
    // console.log('COMPONENT WILL RECEIVE PROPS');
    this.readTweetsFromAPI();
  },


  onToggle: function() {
    this.readTweetsFromAPI();
  },

  render: function() {

    if (this.state.data) {
      return (
        <div>
          <ToggleYear onToggle={this.onToggle} />
          <RouteHandler data={this.state.data} />
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }

});

module.exports = Feed;
