var React = require('react');

var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var Routes = ReactRouter.Routes;
var Link = ReactRouter.Link;
var Redirect = ReactRouter.Redirect;
var DefaultRoute = ReactRouter.DefaultRoute;

// var Layout = require('./jsx/Layout.jsx');
var Feed = require('./jsx/Feed.jsx');
var CurrentFeed = require('./jsx/CurrentFeed.jsx');
var ArchiveFeed = require('./jsx/ArchiveFeed.jsx');

// <Route name="users" path="search/users" handler={Search} />
// <Route name="year" path="/:year" handler={} />
// <Route name="users" path="search/users" handler={Search} />
// <Route name="user" path="/users/:username" handler={UserDetail} />
// <DefaultRoute handler={Search} />

var routes = (
  <Route name="layout" path="/" handler={Feed} ignoreScrollBehavior>
    <Route name="now" path="2015/" handler={CurrentFeed}/>
    <Route name="2014" path="2014/" handler={ArchiveFeed}/>
    <Route name="2013" path="2013/" handler={ArchiveFeed}/>
    <Route name="2012" path="2012/" handler={ArchiveFeed}/>
    // <Route name="previous" path="/:year" handler={ArchiveFeed} />

    <Redirect from="/" to="now" />
  </Route>
);


// React.renderComponent(
//   <Stream />,
//   document.getElementById('app')
// );

ReactRouter.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
