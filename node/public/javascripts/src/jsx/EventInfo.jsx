var React  = require('react');
var Router = require('react-router');

var EventInfo = React.createClass({
  mixins: [ Router.State ],

  getInitialState: function() {
    if (typeof window !== 'undefined') {
      return {
        data: JSON.parse(document.getElementById("DigitalHeroesInitialData").innerHTML).data
      }
    } else {
      return {
        data: this.props.data
      }
    }
  },

  /**
   * Break this out into its own lib file.
   */

  readFromAPI: function(url, successFunction) {

    var Reqwest = require('reqwest');

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
    console.log('EVENT INFO API called');
  },

  /**
  **/

  componentWillMount: function () {
    if (typeof window !== 'undefined') {
      this.setState({
        data: JSON.parse(document.getElementById("DigitalHeroesInitialData").innerHTML).data
      })
    }
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return this.state !== nextState;
    // console.log(nextProps);
    // console.log(nextState);
  },

  componentWillReceiveProps: function (nextProps) {
    this.readEventInfoFromAPI();
  },

  componentDidUpdate: function() {
    // this.readEventInfoFromAPI();
  },

  readEventInfoFromAPI: function() {
    var self = this;

    this.readFromAPI(this.getPath() + '/info', function(info) {

      this.setState({
        data: info
      });

    }.bind(this));
  },

  // A utility function to safely escape JSON for embedding in a <script> tag
  safeStringify: function(obj) {
    return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
  },

  render: function() {
    var html; // = this.state.data[0].value.html;

    // console.log(this.state.data[0]);
    html = this.state.data[0].value.html;

    var json = this.safeStringify(this.state);
    // var json = this.safeStringify(this.props);

    var propStore = <script type="application/json" id="DigitalHeroesInitialData" dangerouslySetInnerHTML={{__html: json }}></script>;

    return (
      <div>
        {propStore}
        <div dangerouslySetInnerHTML={{__html: html }}></div>
      </div>
    );
  }

});

module.exports = EventInfo;
