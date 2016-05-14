'use strict';

import React from 'react';

const Logo = require('../components/Logo');
const EventInfo = require('../components/EventInfo');
const Stream = require('../components/Stream');

var Home = React.createClass({
  propTypes: {
    posts: React.PropTypes.array.isRequired
  },

  render: function () {
    var posts = this.props.posts;
    var logoProps = {
      title: 'BLACK OPS HEROES',
      eventTag: 'blackops-2016'
    };
    var eventInfoProps = {
      titleLead: 'BLACK OPS HEROES',
      titleSupport: 'DEV\'ING THIS BITCH  UP SINCE 2012',
      body: `Digital heroes does Halloween! The one in the summer was so good, we\'re doing it again, for Halloween! \n As per Digital Heroes tradition; a fancy dress night out with all my closest friends &amp; wonderful Web/digital folk of Manchester. (*Fancy dress is a __must__ this time! :P*) - *[see previous years below for ideas.](#twitter-stream)* \n The plan is as follows: \n ## 18:00, SAT 31ST @ TBD, NQ \n Plan is hazy at the moment. Liverpool play Chelsea in the afternoon, so the festivities could potentially start as early as 12:45pm! All i know at the moment is we'll be off to Satan's Hollow in the evening. \n ## REALTIME DIARY OF THE EVENT \n Leave a tweet with the hashtag *#digitalheroes2015* or *#halloweenheroes2015* and your message (including images) will be pulled in below in realtime. Let's get a diary of the build up, and of the night itself! :-)`,
      footer: 'LIVE TWITTER FEED – #digitalheroes2015 / #halloweenheroes2015'
    };

    return (
      <div>
        <Logo {...logoProps} />
        <EventInfo {...eventInfoProps} />
        <Stream posts={ posts } />
      </div>
    );
  }
});

module.exports = Home;
