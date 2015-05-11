/** @jsx React.DOM */

var React         = require('react');
var Router = require('react-router');

var ArchiveFeed = require('./ArchiveFeed.jsx');
var SocketFeed = require('./SocketFeed.jsx');

var Stream = React.createClass({
  mixins: [ Router.State ],

  // componentDidMount: function() {
  //   this.props.readTweetsFromAPI();
  // },

  getInitialState: function() {
    // this.setState({ connected: false });
    return {
      connected: false
    }
  },

  render: function() {
    return (
      <div>
        <SocketFeed connected={this.props.connected} />
        <ArchiveFeed data={this.props.data} />
      </div>
    );
  }

});

module.exports = Stream;
