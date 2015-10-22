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

var target = document.querySelector('.event');
var current_event_height = 0;
var pageInitialised = false;

var getInitialEventHeight = function getInitialEventHeight() {
  return window.dh_el_event_current_height;
}

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {

    if (!pageInitialised) {
      current_event_height = getInitialEventHeight();
      console.log('FIRST HEIGHT: ', current_event_height);
      pageInitialised = true;
    }

    // console.log(mutation.type);
    // console.log(target.offsetHeight);
    // current_event_height = window.dh_el_event_current_height;
    var new_event_height = target.clientHeight;
    var diff_event_height = new_event_height - current_event_height;

    console.log('Current height: ',current_event_height);
    console.log('New height: ', new_event_height);
    console.log('Diff height: ', diff_event_height);

    current_event_height += diff_event_height;

    console.log('Current scroll: ', document.body.scrollTop);
    console.log('Scroll modifier: ', diff_event_height);
    document.body.scrollTop += diff_event_height;
    console.log('New scroll: ', document.body.scrollTop);
  });
});

// configuration of the observer:
var config = {
  // attributes: true,
  // childList: true,
  // characterData: true,
  // type: true
  // attributes: true,
  // childList: true,
  characterData: true,
  subtree:true
};

// pass in the target node, as well as the observer options
observer.observe(target, config);

// // later, you can stop observing
// observer.disconnect();

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});


Router.run(eventInfoRoutes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.querySelector('.event'));
});
