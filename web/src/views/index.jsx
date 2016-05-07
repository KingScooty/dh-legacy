// var Content = require('../components/cheekyComponent');
var escapeHtml = require('escape-html');
var Layout = require('./layout');
var React = require('react');

// var ReactDOMServer = require('react-dom/server');

var Header = require('../components/Header');
var Stream = require('../components/Stream');

var index = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    list: React.PropTypes.array
  },

  render: function() {
    // pass data to client side js
    // xss!!!
    var dataScript = `window.__list__ = '${escapeHtml(JSON.stringify(this.props.list))}';`;
    // render as a dynamic react component
    // var contentString = ReactDOMServer.renderToString(<Header list={this.props.list} />);

    return (
      <Layout title={this.props.title}>
        <h1>{this.props.title}</h1>
        <Header />
        <Stream />

        {/*<div id="content" dangerouslySetInnerHTML={{__html: contentString}}></div>*/}

        <script dangerouslySetInnerHTML={{__html: dataScript}}></script>
      </Layout>
    );
  }
});

module.exports = index;
