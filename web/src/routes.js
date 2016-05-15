// modules/routes.js
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import Home from './containers/Home'
// import About from './About'
// import Repos from './Repos'
// import Repo from './Repo'
// import Home from './Home'

module.exports = (
  <Route name="layout" path="/" component={App} ignoreScrollBehavior>
    {/*<IndexRedirect to="/welcome" />*/}
    {/*<IndexRoute component={Home}/>*/}
    {/*<Route path="/repos" component={Repos}>
      <Route path="/repos/:userName/:repoName" component={Repo}/>
    </Route>*/}
    <Route name="live" path="/halloween15" component={LiveFeed}/>
    <Route name="year" path="/:year" component={ArchiveFeed}/>
  </Route>
);
//
// <Route name="layout" path="/" handler={App} ignoreScrollBehavior>
//   <Route name="live" path="/halloween15" handler={LiveFeed}/>
//   <Route name="year" path="/:year" handler={ArchiveFeed}/>
// </Route>


//
// var routes = (
//   <Route name="layout" path="/" handler={Feed} ignoreScrollBehavior>
//     <Route name="live" path="/halloween15" handler={LiveFeed}/>
//     <Route name="year" path="/:year" handler={ArchiveFeed}/>
//   </Route>
// );
