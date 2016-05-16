import React from 'react';

var Navigation = React.createClass({
  // handleClick: function(name) {
  //   if (window._gs) {
  //     // console.log(event);
  //     _gs('event', 'Toggle event ' + name, {
  //       extra: 'event',
  //       details: true
  //     });
  //   }
  // },

  render: function () {
    return (
      <ul className="stream-navigation">
        <li className="stream-navigation__item">2016</li>
        <li className="stream-navigation__item">2015</li>
        <li className="stream-navigation__item">2014</li>
      </ul>
    );
  }
});

module.exports = Navigation;
