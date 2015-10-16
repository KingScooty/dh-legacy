var React  = require('react');
var Router = require('react-router');

var ArchiveFeed = require('./ArchiveFeed.jsx');
var SocketFeed = require('./SocketFeed.jsx');

var LiveFeed = React.createClass({
  mixins: [ Router.State ],

  render: function() {
    return (
      <div>
        <SocketFeed
          connected={this.props.connected}
          enableSocketState={this.props.enableSocketState}
          disableSocketState={this.props.disableSocketState}
        />
        <ArchiveFeed fadeInPage={this.props.fadeInPage} />
      </div>
    );
  }

});

module.exports = LiveFeed;
