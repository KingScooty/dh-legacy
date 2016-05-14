var React = require('react');
var classNames = require('classnames');

var Logo = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    eventTag: React.PropTypes.string.isRequired
  },

  render: function () {
    var title = this.props.title;
    var eventTag = this.props.eventTag;
    var logoClasses = classNames(
      'logo',
      'js',
      `logo--${eventTag}`
    );

    return (
      <div className={ logoClasses }>
        <div className="logo__ribbon"><div className="logo__ribbon__text"></div></div>

        <a href="/" className="logo__base">{ title }</a>

        <div className="logo__props logo__props--engaged">
          <div className="lightsaber lightsaber--red"></div>
          <div className="lightsaber lightsaber--blue lightsaber--flipped"></div>
        </div>
      </div>
    );
  }
});

module.exports = Logo;
