/** @jsx React.DOM */

var React  = require('react');

var Stream = React.createClass({
  render: function() {
    return (
      <div className="tweet-list__loading">
        <div className="tweet">

          <div className="tweet__container">
            <div className="tweet__profile_picture">
              <img src="/images/icon__download.png" />
            </div>
            <div className="tweet__screen_name">
              <a href="#">@Jarvis</a>
            </div>

            <div className="tweet__body">Prepping feed.</div>

          </div>
        </div>
      </div>
    );
  }

});

module.exports = Stream;
