var React  = require('react/addons'); //,
var Router = require('react-router');
var classNames = require('classnames');

var TransitionGroup = React.addons.CSSTransitionGroup;

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Status        = require('./Status.jsx');
var Loading       = require('./Loading.jsx');
var ToggleYear    = require('./ToggleYear.jsx');

var Feed = React.createClass({
  mixins: [ Router.State ],

  // Invoked once before the component is mounted.
  // The return value will be used as the initial value of this.state.
  getInitialState: function() {
    return {
      connected: false,
      view_ready: false
    }
  },

  enableSocketState: function() {
    this.setState({ connected: true });
  },

  disableSocketState: function() {
    this.setState({ connected: false });
  },

  fadeInPage: function() {
    this.setState({
      view_ready: true
    });
  },

  componentDidMount: function() {
  },

  componentWillUpdate: function() {
  },

  componentWillReceiveProps: function() {
    // force loading render per route change
    this.setState({
      // connected: false,
      view_ready: false
    });
  },

  render: function() {

    var path = this.getPath().replace('/', '');
    var body_class = classNames(
      'tweet-list__body',
      { 'tweet-list__body--inactive': !this.state.view_ready }
    );

    // if (this.state.data) {
      return (
        <div className="tweet-list">
          <div className="tweet-list__head">
            <Status connected={this.state.connected}/>
            <div className="tweet-list__head__nav">
              <Loading viewReady={this.state.view_ready} />
              <ToggleYear />
            </div>
          </div>
          <div className={body_class}>
            <div>
              <TransitionGroup transitionName="fade">
                <RouteHandler key={path}
                  enableSocketState={this.enableSocketState}
                  disableSocketState={this.disableSocketState}
                  fadeInPage={this.fadeInPage}
                />
              </TransitionGroup>
            </div>
          </div>
        </div>
      );
    // } else {
    //   return <div>Loading...</div>;
    // }
  }

});

module.exports = Feed;
