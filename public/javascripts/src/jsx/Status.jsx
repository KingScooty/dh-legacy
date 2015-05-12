var React = require('react');
var classNames = require('classnames');

var Status = React.createClass({

  render: function() {

    var status_text = this.props.connected ? 'LIVE' : 'Offline';
    var status_class = classNames(
      'socket-connection__status',
      { 'socket-connection__status--down': !this.props.connected },
      { 'socket-connection__status--up': this.props.connected }
    );

    console.log('connection status: ', this.props.connected);

    return (
      <div className="socket-connection">Stream:&nbsp;
        <span className={status_class}>{status_text}</span>
      </div>
    );
  }

});

module.exports = Status;
