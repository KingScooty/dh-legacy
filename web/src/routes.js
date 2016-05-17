// modules/routes.js
import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './app';
import Home from './containers/Page/Home';
import LiveFeed from './containers/Stream/LiveFeed';
import ArchiveFeed from './containers/Stream/ArchiveFeed';
import Stream from './components/Stream';

module.exports = (
  <Route component={ App } ignoreScrollBehavior>
    <Route path="/" component={ Home }>
      <Route components={ {Stream: Stream } } >
        <IndexRedirect to="/2016" />
        <Route path="2016" components={ {live: LiveFeed, archive: ArchiveFeed } } />
        <Route path=":year" components={ {archive: ArchiveFeed } } />
      </Route>
    </Route>
  </Route>
);
