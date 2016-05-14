'use strict';

import React from 'react';

const Logo = require('../components/Logo');
const EventInfo = require('../components/EventInfo');
const Stream = require('../components/Stream');

var digitalHeroes = React.createClass({
  propTypes: {
    posts: React.PropTypes.array.isRequired
  },

  render: function () {
    var posts = this.props.posts;

    return (
      <div id="app" className="app">
        <Logo />
        <EventInfo />
        <Stream posts={ posts } />
      </div>
    );
  }
});

module.exports = digitalHeroes;
