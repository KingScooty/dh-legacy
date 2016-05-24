import React from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import { fetchEventIfNeeded } from '../../actions';

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

  // onClickHandler: function (event) {
  //   // e.stopPropagation();
  //   // e.preventDefault();
  //
  //
  //   console.log('On click handler has been triggered for', event);
  //   this.props.fetchEventIfNeeded(event);
  // },

  render: function () {
    return (
      <ul className="stream-navigation">
        <li className="stream-navigation__item">
          <Link activeClassName="active" to="/2016">2016</Link>
        </li>
        <li className="stream-navigation__item">
          <Link activeClassName="active" to="/halloween15">Halloween ’15</Link>
        </li>
        <li className="stream-navigation__item">
          <Link activeClassName="active" to="/2015">2015</Link>
        </li>
        <li className="stream-navigation__item">
          <Link activeClassName="active" to="/2014">2014</Link>
        </li>
        <li className="stream-navigation__item">
          <Link activeClassName="active" to="/2013">2013</Link>
        </li>
        <li className="stream-navigation__item">
          <Link activeClassName="active" to="/2012">2012</Link>
        </li>
      </ul>
    );
  }
});

var mapDispatchToProps = (dispatch) => {
  return {
    fetchEventIfNeeded: (event) => {
      dispatch(fetchEventIfNeeded(event));
    }
  };
};

// module.exports = Navigation;
module.exports = connect(
  null,
  mapDispatchToProps
)(Navigation);
