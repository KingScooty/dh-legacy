var React = require('react');
var classNames = require('classnames');

var Status = React.createClass({

  render: function() {

    var status_text = this.props.connection ? 'LIVE' : 'Offline';
    var status_class = classNames(
      'socket-connection__status',
      { 'socket-connection__status--up': false },
      { 'socket-connection__status--down': true }
    );

    console.log(status);

    return (
      <div className="socket-connection">Stream:&nbsp;
        <span className={status_class}>{status_text}</span>
      </div>
    );
  }

});

module.exports = Status;
