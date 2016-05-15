'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

const mountPoint = document.getElementById('app');

// This gets put in a store going forward???
// const hydratedState = JSON.parse(document.getElementById('__INITIAL_STATE__').innerHTML);

// const App = require('./App');
import routes from './routes';

render(
  <Router routes={ routes } history={ browserHistory } />,
  mountPoint
);
