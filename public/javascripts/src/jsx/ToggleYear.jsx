var React = require('react');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var ToggleYear = React.createClass({

  render: function() {

    var classString, buttonText;

    // if (this.props.displayed) {
    //   classString = 'btn btn-default btn-block';
    //   buttonText = 'Cancel';
    // } else {
    //   classString = 'btn btn-success btn-block';
    //   buttonText = 'Create New Item';
    // }

    return (
      // <button className={classString}
      //         onClick={this.props.onToggleForm}>
      //         {buttonText}
      // </button>
      <ul>
        <li><Link to="2012">2012</Link></li>
        <li><Link to="2013">2013</Link></li>
        <li><Link to="2014">2014</Link></li>
        <li><Link to="now">2015</Link></li>
      </ul>
    );
  }

});

module.exports = ToggleYear;
