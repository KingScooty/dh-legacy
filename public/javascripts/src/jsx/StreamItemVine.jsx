var React = require('react');

var StreamItemMedia = React.createClass({

  render: function() {

    var url = this.props.entities.urls[0].expanded_url + "/embed/simple";

    return (
      <div className="tweet__entities">
        <iframe src={url} width="600" height="600" frameBorder="0"></iframe>
        <script src="https://platform.vine.co/static/scripts/embed.js"></script>
      </div>
    );
  }

});

module.exports = StreamItemMedia;
