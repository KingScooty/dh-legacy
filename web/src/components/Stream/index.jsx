var React = require('react');
var LiveIndicator = require('../../containers/LiveIndicator');
var Navigation = require('../Navigation');

var Stream = React.createClass({
  propTypes: {
    live: React.PropTypes.node,
    archive: React.PropTypes.node.isRequired
  },

  render: function () {
    var { live, archive } = this.props;

    return (
      <div id="stream" className="stream">
        <div className="stream__header">

          <LiveIndicator />

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
