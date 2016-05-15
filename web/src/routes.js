// modules/routes.js
import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './app';
import Home from './containers/Page/Home';
import LiveFeed from './containers/Stream/LiveFeed';
import ArchiveFeed from './containers/Stream/ArchiveFeed';
import Stream from './components/Stream';

// import About from './About'
// import Repos from './Repos'
// import Repo from './Repo'
// import Home from './Home'

module.exports = (
  <Route component={ App } ignoreScrollBehavior>
    <Route path="/" component={ Home }>
      <Route components={ {Stream: Stream } } >
        <IndexRedirect to="/halloween15" />
        <Route path="halloween15" components={ {live: LiveFeed, archive: ArchiveFeed } } />
        <Route path=":year" components={ {archive: ArchiveFeed } } />
      </Route>
    </Route>
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
