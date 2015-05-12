/** @jsx React.DOM */

var React         = require('react/addons'); //,
var io            = require('socket.io-client');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Stream = React.createClass({

  getInitialState: function() {
    return {
      connected: false
    }
  },

  connectToSockets: function() {
    console.log('Connect to sockets init!');
    var self = this;
    // var socket = io('http://localhost/');
    var socket = io.connect({
      multiplex: false
    });

    socket.on('connect', function() {
      console.log('connected!');
      socket.on('news', function(response) {
        console.log(response);
      });
      self.setState({connected: true });
      self.props.enableSocketState();
    });
  },

  // Called each time componented is mounted
  componentWillMount: function () {
    this.connectToSockets();
    console.log('> componentWillMount()');
  },

  // Called once first time mounted and cached until there are changes
  componentDidMount: function() {
  },

  // Called each time the component is unmounted
  componentWillUnmount: function () {
      console.log('> componentWillUnmount()');
  },

  render: function() {
    // console.log('hello props?');
    // console.log(this.props.data);
    // console.log(this.props.connected);
    if (this.state.connected) {
      var socket_component = (
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

    return (
      <ReactCSSTransitionGroup transitionName="fade">
        {socket_component}
      </ReactCSSTransitionGroup>
    );
  }

});

module.exports = Stream;
