var React = require('react');

var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var Link = Router.Link;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;

var Feed = require('./jsx/Feed.jsx');
var LiveFeed = require('./jsx/LiveFeed.jsx');
var ArchiveFeed = require('./jsx/ArchiveFeed.jsx');

var EventInfo = require('./jsx/EventInfo.jsx');

var routes = (
  <Route name="layout" path="/" handler={Feed} ignoreScrollBehavior>
    <Route name="live" path="/halloween15" handler={LiveFeed}/>
    <Route name="year" path="/:year" handler={ArchiveFeed}/>
  </Route>
);

var eventInfoRoutes = (
  <Route name="year" path="/:year" handler={EventInfo} ignoreScrollBehavior/>
)

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});

Router.run(eventInfoRoutes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.querySelector('.event'));
});

require('./scrollPos');

var lightsaber = document.querySelectorAll('.lightsaber');

console.log(lightsaber);

Array.fromList = function(list) {
  var array = [];
  for (var i = 0, n = list.length; i < n; i++) {
    array[i] = list[i];
  }
  return array;
};

Array.fromList(lightsaber).forEach(function(el) {
  // setTimeout(function() {
    el.classList.remove('lightsaber--stand');
  // }, 1200);
});

setTimeout(function() {
  document.querySelector('.bg2').classList.add('active', 'shake', 'shake_y--fast');
// }, 1535 /*1450*/)
// }, 1435 /*1450*/)
}, 1365 /*1450*/)

setTimeout(function() {
  document.querySelector('.logo').classList.add('shake', 'shake_x', 'shake_x--long');
// }, 1535 /*1450*/)
// }, 1435 /*1450*/)
}, 1365 /*1450*/)
