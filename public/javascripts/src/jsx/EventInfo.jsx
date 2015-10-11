/** @jsx React.DOM */

var React  = require('react');
var Router = require('react-router');

var EventInfo = React.createClass({
  mixins: [ Router.State ],

  render: function() {

    return (
      <h1>Hello! Event Info here! {this.getPath()}</h1>
    );
  }

});

module.exports = EventInfo;
