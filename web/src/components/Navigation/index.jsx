import React from 'react';
import { Link } from 'react-router';

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
        <li className="stream-navigation__item">
          <Link to="/2016">2016</Link>
        </li>
        <li className="stream-navigation__item">
          <Link to="/halloween15">Halloween ’15</Link>
        </li>
        <li className="stream-navigation__item">
          <Link to="/2015">2015</Link>
        </li>
        <li className="stream-navigation__item">
          <Link to="/2014">2014</Link>
        </li>
        <li className="stream-navigation__item">
          <Link to="/2013">2013</Link>
        </li>
        <li className="stream-navigation__item">
          <Link to="/2012">2012</Link>
        </li>
      </ul>
    );
  }
});

module.exports = Navigation;
