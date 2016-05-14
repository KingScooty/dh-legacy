'use strict';

var React = require('react');
var Root = require('./containers/Root');

var App = React.createClass({
  propTypes: {
    children: React.PropTypes.node // .isRequired
  },

  render: function () {
    return (
      <div id="app">
        {/*{ this.props.children }*/}
        <Root posts={this.props.posts} />
      </div>
    );
  }
});

module.exports = App;
