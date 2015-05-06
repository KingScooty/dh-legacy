/** @jsx React.DOM */

var React         = require('react'); //,
var Router = require('react-router'); // or var Router = ReactRouter; in browsers

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var ToggleYear    = require('./ToggleYear.jsx');

var Feed = React.createClass({

  onToggle: function() {

  },

  render: function() {
    return (
      <div>
        <ToggleYear onToggle={this.onToggle} />
        <RouteHandler/>
      </div>
    );
  }

});

module.exports = Feed;
