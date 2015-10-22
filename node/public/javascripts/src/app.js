var React = require('react');

var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var Link = Router.Link;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;

// var Layout = require('./jsx/Layout.jsx');
var Feed = require('./jsx/Feed.jsx');
var LiveFeed = require('./jsx/LiveFeed.jsx');
var ArchiveFeed = require('./jsx/ArchiveFeed.jsx');

var EventInfo = require('./jsx/EventInfo.jsx');


// <Route name="users" path="search/users" handler={Search} />
// <Route name="year" path="/:year" handler={} />
// <Route name="users" path="search/users" handler={Search} />
// <Route name="user" path="/users/:username" handler={UserDetail} />
// <DefaultRoute handler={Search} />

var routes = (
  <Route name="layout" path="/" handler={Feed} ignoreScrollBehavior>
    <Route name="live" path="/halloween15" handler={LiveFeed}/>
    <Route name="year" path="/:year" handler={ArchiveFeed}/>
    // <Redirect from="/" to="live" />
  </Route>
);

var eventInfoRoutes = (
  // <Route name="layout" path="/" handler={EventInfo}>
  //   <Route name="live" path="/2015" handler={LiveFeed}/>
  //   <Route name="year" path="/:year" handler={ArchiveFeed}/>
  // </Route>
  <Route name="year" path="/:year" handler={EventInfo} ignoreScrollBehavior/>
)

// React.renderComponent(
//   <Stream />,
//   document.getElementById('app')
// );

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});


Router.run(eventInfoRoutes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.getElementById('EventInfo'));
});