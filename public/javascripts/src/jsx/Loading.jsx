/** @jsx React.DOM */

var React  = require('react');
// var classNames = require('classnames');

var Loading = React.createClass({

  render: function() {
    var elClass = this.props.viewReady ? 'loader' : 'loader active';

    // var elClass = classNames(
    //   'loader',
    //   { 'active': !this.props.viewReady }
    // );

    return (
      <div className={elClass}>Loading...</div>
    );
  }

});

module.exports = Loading;
