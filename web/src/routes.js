// modules/routes.js
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Root from './containers/Root'
// import About from './About'
// import Repos from './Repos'
// import Repo from './Repo'
// import Home from './Home'

module.exports = (
  <Route path="/" component={Root}>
    {/*<IndexRedirect to="/welcome" />*/}
    <IndexRoute component={Home}/>
    <Route path="/repos" component={Repos}>
      <Route path="/repos/:userName/:repoName" component={Repo}/>
    </Route>
  </Route>
);



//
// var routes = (
//   <Route name="layout" path="/" handler={Feed} ignoreScrollBehavior>
//     <Route name="live" path="/halloween15" handler={LiveFeed}/>
//     <Route name="year" path="/:year" handler={ArchiveFeed}/>
//   </Route>
// );
