"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

// const mountNode - document.getElementById("");
const dehydratedState = window.__INITIAL_STATE__;

function renderApp(locale) {
  const app = require('./app');

  app.rehydrate(dehydratedState, (err, context) => {
    if (err) {
      throw(err);
    }
  });
}
