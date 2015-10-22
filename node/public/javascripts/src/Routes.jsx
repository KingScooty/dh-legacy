var React = require('react');
var {DefaultRoute, NotFoundRoute, Route} = require('react-router');

module.exports = [
  <Route name="year" path="/:year" handler={EventInfo} ignoreScrollBehavior/>
]
