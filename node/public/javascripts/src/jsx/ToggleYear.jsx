var React = require('react');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers

var Link = Router.Link;

var ToggleYear = React.createClass({

  handleClick: function(name) {
    if (window._gs) {
      // console.log(event);
      _gs('event', 'Toggle event ' + name, {
        extra: 'event',
        details: true
      });
    }
  },

  render: function() {
    return (
      <ul className="stream-nav">
        <li className="stream-nav__item"
        onClick={this.handleClick.bind(this, 'Halloween-15')}>
          <Link to="/halloween15">Halloween ’15</Link>
        </li>

        <li className="stream-nav__item"          onClick={this.handleClick.bind(this, '2015')}>
          <Link to="/2015">2015</Link>
        </li>

        <li className="stream-nav__item"
        onClick={this.handleClick.bind(this, '2014')}>
          <Link to="/2014">2014</Link>
        </li>

        <li className="stream-nav__item"
        onClick={this.handleClick.bind(this, '2013')}>
          <Link to="/2013">2013</Link>
        </li>

        <li className="stream-nav__item"
        onClick={this.handleClick.bind(this, '2012')}>
          <Link to="/2012">2012</Link>
        </li>
      </ul>
    );
  }

});

module.exports = ToggleYear;
