var React = require('react');
var Navigation = require('../Navigation');

var Stream = React.createClass({
  propTypes: {
    live: React.PropTypes.node,
    archive: React.PropTypes.node.isRequired
  },

  render: function () {
    var { live, archive } = this.props;

    console.log(this.props.store);

    return (
      <div id="stream" className="stream">
        <div className="stream__header">

          <div className="live-status">LIVE</div>

          <Navigation />
        </div>

        <div className="stream__body">
          { live }
          { archive }
        </div>
      </div>
    );
  }
});

module.exports = Stream;
