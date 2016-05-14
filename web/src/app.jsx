'use strict';

var React = require('react');
var Home = require('./containers/Home');

var App = React.createClass({
  propTypes: {
    children: React.PropTypes.node // .isRequired
  },

  render: function () {
    return (
      <div id="app">
        {/*{ this.props.children }*/}
        <Home posts={this.props.posts} />
      </div>
    );
  }
});

module.exports = App;
