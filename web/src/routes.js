// modules/routes.js
import React from 'react';
import { Router, Route, IndexRedirect } from 'react-router';
import { fetchEventIfNeeded } from './actions';

import App from './app';
import Home from './containers/Page/Home';
import LiveFeed from './containers/Stream/LiveFeed';
import ArchiveFeed from './containers/Stream/ArchiveFeed';
import Stream from './components/Stream';

export default (history, dispatch) => {
  /**
  * Crude implementation for now.
  * Use `redux-async-connect` or something mentioned in this article:

    https://medium.com/@dbow1234/expressing-data-dependencies-in-react-43a2004e04bc#.yl4o6h19w

  * Original stack overflow question:

    http://stackoverflow.com/questions/37406584/react-router-redux-dispatch-an-async-action-on-route-change
   */

  const fetchPosts = ({location}) => {
    // Prevent fetching if on the server. (Crude, but it works!)
    if (!dispatch) return;

    const event = location.pathname.slice(1);
    dispatch(fetchEventIfNeeded(event));
  };

  return (
    <Router history={ history } >
      <Route component={ App } ignoreScrollBehavior>
        <Route path="/" component={ Home }>
          <Route components={ {Stream: Stream } } >
            <IndexRedirect to="/2015" />
            <Route name="live" path="/2015" components={ {live: LiveFeed, archive: ArchiveFeed } } onEnter={ fetchPosts } />
            <Route name="year" path="/:year" components={ {archive: ArchiveFeed } } onEnter={ fetchPosts } />
          </Route>
        </Route>
      </Route>
    </Router>
  );
};
