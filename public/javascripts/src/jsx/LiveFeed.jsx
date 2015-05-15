/** @jsx React.DOM */

var React         = require('react');
var Router = require('react-router');

var ArchiveFeed = require('./ArchiveFeed.jsx');
var SocketFeed = require('./SocketFeed.jsx');

var LiveFeed = React.createClass({
  mixins: [ Router.State ],

  componentWillMount: function () {
      // console.log('> componentWillMount()');
  },

  componentDidMount: function() {
  },

  componentWillUnmount: function () {
      // console.log('> componentWillUnmount()');
  },

  render: function() {
    return (
      <div>
        <SocketFeed
          connected={this.props.connected}
          enableSocketState={this.props.enableSocketState} />
        <ArchiveFeed fadeInPage={this.props.fadeInPage} />
      </div>
    );
  }

});

module.exports = LiveFeed;
