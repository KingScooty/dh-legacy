/** @jsx React.DOM */

var React         = require('react'); //,
// var io            = require('socket.io-client');

var Stream = React.createClass({

  componentDidMount: function() {
    this.props.connectToSockets();
  },

  render: function() {
    // console.log('hello props?');
    // console.log(this.props.data);
    // console.log(this.props.connected);

    return (
      <div className="tweet-list__live">

        <div className="tweet">

          <div className="tweet__container">
            <div className="tweet__profile_picture">
              <img src="" />
            </div>
            <div className="tweet__screen_name">
              <a href="/"></a>
            </div>

            <div className="tweet__body">This is a body of text tweet for testing out sockets</div>

            <div className="tweet__meta">
              <a href="#">
                <time className="tweet__time timeago" dateTime="{created_at}">
                  5 seconds ago
                </time>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Stream;
