/** @jsx React.DOM */

var React  = require('react');
var Router = require('react-router');
var Reqwest = require('reqwest');

var EventInfo = React.createClass({
  mixins: [ Router.State ],

  getInitialState: function() {
    return {
      data: [
        {
          value: {
            html: "Loading..."
          }
        }
      ]
    }
  },

  /**
   * Break this out into its own lib file.
   */

  readFromAPI: function(url, successFunction) {
    Reqwest({
      url: url,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: successFunction,
      error: function(error) {
        console.error(url, error['response']);
        location = '/';
      }
    });
    console.log('read api called');
  },

  /**
  **/

  componentWillMount: function () {
    this.readEventInfoFromAPI();
  },

  componentWillReceiveProps: function (nextProps) {
    this.readEventInfoFromAPI();
  },

  readEventInfoFromAPI: function() {
    var self = this;

    this.readFromAPI(this.getPath() + '/info', function(info) {

      this.setState({
        data: info
      });

    }.bind(this));
  },

  render: function() {
    var html = this.state.data[0].value.html;

    return (
      <div>
        <h1>Hello! Event Info here! {this.getPath()}</h1>
        <div dangerouslySetInnerHTML={{__html: html }}></div>
      </div>
    );
  }

});

module.exports = EventInfo;
