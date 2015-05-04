var React = require('react');
var Stream = require('./jsx/Stream');
var Router = require('react-router');


var routes = (
    <Route name="layout" path="/" handler={Layout}>
      // <Route name="users" path="search/users" handler={Search} />
      <Route name="year" path="/:year" handler={} />
      // <Route name="users" path="search/users" handler={Search} />
      // <Route name="user" path="/users/:username" handler={UserDetail} />
      // <DefaultRoute handler={Search} />
      <Redirect from="/" to="2015" />
    </Route>
);

// React.renderComponent(
//   <Stream />,
//   document.getElementById('app')
// );

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
