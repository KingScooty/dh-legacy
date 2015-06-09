var React = require('react');

var StreamItemMedia = React.createClass({

  render: function() {

    // var url = this.props.entities.urls[0].expanded_url + "/embed/simple";
    var url = this.props.entities.urls[0].expanded_url + "/card?mute=0";

    return (
      <div className="tweet__entities">
        <iframe src={url} width="590" height="590" frameBorder="0" scrolling="no" seamless="seamless"></iframe>
      </div>
    );
  }

});

module.exports = StreamItemMedia;
