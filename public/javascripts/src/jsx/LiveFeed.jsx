/** @jsx React.DOM */

var React         = require('react');
var Router = require('react-router');

var ArchiveFeed = require('./ArchiveFeed.jsx');
var SocketFeed = require('./SocketFeed.jsx');

var Stream = React.createClass({
  mixins: [ Router.State ],

  componentDidMount: function() {
  },

  render: function() {
    return (
      <div>
        <SocketFeed
          connected={this.props.connected}
          connectToSockets={this.props.connectToSockets} />
        <ArchiveFeed data={this.props.data} />
      </div>
    );
  }

});

module.exports = Stream;
