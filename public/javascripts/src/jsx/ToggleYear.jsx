var React = require('react');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers

var Link = Router.Link;

var ToggleYear = React.createClass({

  render: function() {
    return (
      <ul className="stream-nav">
        <li className="stream-nav__item"><Link to="/halloween15">Halloween '15</Link></li>
        <li className="stream-nav__item"><Link to="/2015">2015</Link></li>
        <li className="stream-nav__item"><Link to="/2014">2014</Link></li>
        <li className="stream-nav__item"><Link to="/2013">2013</Link></li>
        <li className="stream-nav__item"><Link to="/2012">2012</Link></li>
      </ul>
    );
  }

});

module.exports = ToggleYear;
