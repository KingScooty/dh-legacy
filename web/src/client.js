'use strict';

import React from 'react';
import { render } from 'react-dom';
// import { Route, IndexRoute } from 'react-router'

const mountNode = document.getElementById('app');

const hydratedState = JSON.parse(document.getElementById('__INITIAL_STATE__').innerHTML);

const App = require('./App');

// function renderApp(locale) {
//   const app = require('./app');

  // app.rehydrate(dehydratedState, (err, context) => {
  //   if (err) {
  //     throw(err);
  //   }
  // });
// }
// Client(window.__INITIAL_STATE__), document.getElementById('app')

render(<App posts={ hydratedState } />, mountNode);




// render((
//   <Router history={browserHistory}>
//     <Route path="/" component={Root}>
//       {/*<IndexRoute component={Home}/>*/}
//       <Route path="/repos" component={Repos}>
//         <Route path="/repos/:userName/:repoName" component={Repo}/>
//       </Route>
//       <Route path="/about" component={About}/>
//     </Route>
//   </Router>
// ), mountNode)
