var React = require('react');

var cheekyComponent = React.createClass({

  render: function() {
    return (
      <div>
        <h2>This is a super cheeky sub component.</h2>
      </div>
    );
  }
});

module.exports = cheekyComponent;
