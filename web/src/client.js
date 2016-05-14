'use strict';

import React from 'react';
import { render } from 'react-dom';

const mountNode = document.getElementById('app');

const hydratedState = JSON.parse(document.getElementById('__INITIAL_STATE__').innerHTML);

const Root = require('./containers/Root');

// function renderApp(locale) {
//   const app = require('./app');

  // app.rehydrate(dehydratedState, (err, context) => {
  //   if (err) {
  //     throw(err);
  //   }
  // });
// }
// Client(window.__INITIAL_STATE__), document.getElementById('app')

render(<Root posts={ hydratedState } />, mountNode);
