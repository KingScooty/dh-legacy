'use strict';

var React = require('react');
var Router = require('react-router');

var EventInfo = React.createClass({
  displayName: 'EventInfo',

  mixins: [Router.State],

  getInitialState: function getInitialState() {
    if (typeof window !== 'undefined') {
      return {
        data: JSON.parse(document.getElementById("DigitalHeroesInitialData").innerHTML).data
      };
    } else {
      return {
        data: this.props.data
      };
    }
  },

  /**
   * Break this out into its own lib file.
   */

  readFromAPI: function readFromAPI(url, successFunction) {

    var Reqwest = require('reqwest');

    Reqwest({
      url: url,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: successFunction,
      error: function error(_error) {
        console.error(url, _error['response']);
        location = '/';
      }
    });
    console.log('EVENT INFO API called');
  },

  /**
  **/

  componentWillMount: function componentWillMount() {
    if (typeof window !== 'undefined') {
      this.setState({
        data: JSON.parse(document.getElementById("DigitalHeroesInitialData").innerHTML).data
      });
    }
  },

  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
    // console.log(nextProps);
    // console.log(nextState);
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.readEventInfoFromAPI();
  },

  componentDidUpdate: function componentDidUpdate() {
    // this.readEventInfoFromAPI();
  },

  readEventInfoFromAPI: function readEventInfoFromAPI() {
    var self = this;

    this.readFromAPI(this.getPath() + '/info', (function (info) {

      this.setState({
        data: info
      });
    }).bind(this));
  },

  // A utility function to safely escape JSON for embedding in a <script> tag
  safeStringify: function safeStringify(obj) {
    return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
  },

  render: function render() {
    var html; // = this.state.data[0].value.html;

    // console.log(this.state.data[0]);
    html = this.state.data[0].value.html;

    var json = this.safeStringify(this.state);
    // var json = this.safeStringify(this.props);

    var propStore = React.createElement('script', { type: 'application/json', id: 'DigitalHeroesInitialData', dangerouslySetInnerHTML: { __html: json } });

    return React.createElement(
      'div',
      null,
      propStore,
      React.createElement('div', { dangerouslySetInnerHTML: { __html: html } })
    );
  }

});

module.exports = EventInfo;
