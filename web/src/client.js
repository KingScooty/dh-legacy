'use strict';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

const mountNode = document.getElementById('app');

const hydratedState = JSON.parse(document.getElementById('__INITIAL_STATE__').innerHTML);

const DigitalHeroes = require('./containers/digital-heroes');

// function renderApp(locale) {
//   const app = require('./app');

  // app.rehydrate(dehydratedState, (err, context) => {
  //   if (err) {
  //     throw(err);
  //   }
  // });
// }
// Client(window.__INITIAL_STATE__), document.getElementById('app')
// ReactDOM.render(<DigitalHeroes posts={ hydratedState } />, mountNode);

// rename digital-heroes to Root
// Mimic this setup for props and stores:
// https://github.com/gaearon/redux-devtools/blob/64f58b7010a1b2a71ad16716eb37ac1031f93915/examples/todomvc/index.js

render(
  <AppContainer>
    <DigitalHeroes posts={hydratedState} />
  </AppContainer>,
  mountNode
);

if (module.hot) {
  module.hot.accept('./containers/digital-heroes', function() {
    render(
      <AppContainer>
        <DigitalHeroes posts={hydratedState} />
      </AppContainer>,
      mountNode
    )
  });
}
