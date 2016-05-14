var React = require('react');
var classNames = require('classnames');

var Logo = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    eventTag: React.ProtoTypes.string.isRequired
  },

  // getFeed: function() {
  //   return (
  //     <h1>HELLO!!!</h1>
  //   )
  // },

  render: function() {

    // var feed = this.getFeed();

    var title = this.props.title;
    var eventTag = this.props.eventTag;
    var logoClasses = classNames(
      'logo',
      'js',
      `logo--${eventTag}`
    );

    return (
      <div class={ logoClasses }>
        <div class="logo__ribbon"><div class="logo__ribbon__text"></div></div>

        <a href="/" class="logo__base">{ title }</a>

        <div class="logo__props logo__props--engaged">
          <div class="lightsaber lightsaber--red"></div>
          <div class="lightsaber lightsaber--blue lightsaber--flipped"></div>
        </div>
      </div>
    );
  }
});

module.exports = Logo;
