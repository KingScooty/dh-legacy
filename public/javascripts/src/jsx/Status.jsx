var React = require('react');

var Status = React.createClass({

  render: function() {
    return (
      // var cx = React.addons.classSet;
      // var connection_up = 'socket-connection__status--up';
      // var connection_down = 'socket-connection__status--down';
      // var classes = cx('message', connection_up, connection_down);

      <div className="socket-connection">Connection:&nbsp;
        <span className="socket-connection__status socket-connection__status--up">Active</span>
      </div>
    );
  }

});

module.exports = Status;
