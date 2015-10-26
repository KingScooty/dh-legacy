var React = require('react');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers

var Link = Router.Link;

var ToggleYear = React.createClass({

  onItemClick: function(event) {
    !function(g,s,q,r,d){r=g[r]=g[r]||function(){(r.q=r.q||[]).push(
    arguments)};d=s.createElement(q);q=s.getElementsByTagName(q)[0];
    d.src='//d1l6p2sc9645hc.cloudfront.net/tracker.js';q.parentNode.
    insertBefore(d,q)}(window,document,'script','_gs');

    console.log('CLICK EVENT TRAKING');
    console.log(event);
    // window._gs('event', 'Clicked ' + route);
    _gs('event', 'Clicked year', {
      extra: 'event',
      details: true
    });
  },

  render: function() {
    return (
      <ul className="stream-nav">
        <li className="stream-nav__item" onClick={this.onItemClick}><Link to="/halloween15">Halloween ’15</Link></li>
        <li className="stream-nav__item" onClick={this.onItemClick}><Link to="/2015">2015</Link></li>
        <li className="stream-nav__item" onClick={this.onItemClick}><Link to="/2014">2014</Link></li>
        <li className="stream-nav__item" onClick={this.onItemClick}><Link to="/2013">2013</Link></li>
        <li className="stream-nav__item" onClick={this.onItemClick}><Link to="/2012">2012</Link></li>
      </ul>
    );
  }

});

module.exports = ToggleYear;
