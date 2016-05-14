var escapeHtml = require('escape-html');
var Layout = require('./layout');
var React = require('react');
var ReactDOMServer = require('react-dom/server');

var Header = require('../components/Header');
var Stream = require('../components/Stream');


var index = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    list: React.PropTypes.array
  },

  safeStringify: function(obj) {
    return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
  },

  render: function() {
    var dataScript = this.safeStringify(this.props.posts);

    // render as a dynamic react component
    var streamString = ReactDOMServer.renderToString(
      <Stream posts={this.props.posts} />
    );

    return (
      <Layout title={this.props.title}>
        <h1>{this.props.title}</h1>
        <Header />
        
        <div id="stream" class="stream" dangerouslySetInnerHTML={{__html: streamString}} />

        <script charSet="utf-8" id="__INITIAL_STATE__" type="application/json" dangerouslySetInnerHTML={{__html: dataScript}}></script>
      </Layout>
    );
  }
});

module.exports = index;
