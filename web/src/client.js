"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

const mountNode = document.getElementById("stream");

const hydratedState = JSON.parse(document.getElementById('__INITIAL_STATE__').innerHTML);

const Stream = require('./components/Stream');

// function renderApp(locale) {
//   const app = require('./app');

  // app.rehydrate(dehydratedState, (err, context) => {
  //   if (err) {
  //     throw(err);
  //   }
  // });
// }
// Client(window.__INITIAL_STATE__), document.getElementById('app')

 ReactDOM.render(<Stream posts={hydratedState} />, mountNode);
