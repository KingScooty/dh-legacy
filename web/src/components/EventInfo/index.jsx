var React = require('react');
var marked = require('marked');

var EventInfo = React.createClass({
  propTypes: {
    titleLead: React.PropTypes.string,
    titleSupport: React.ProtoTypes.string,
    body: React.ProtoTypes.string,
    footer: React.ProtoTypes.string
  },

  convertMarkdown: function (markdown) {
    var renderedMarkdown;
    if (!markdown) return false;

    renderedMarkdown = marked(markdown, {sanitize: true});
    return {
      dangerouslySetInnerHTML: {
        __html: renderedMarkdown
      }
    };
  },

  render: function () {
    const getEventBody = this.convertMarkdown(this.props.body);
    const titleLead = this.props.titleLead;
    const titleSupport = this.props.titleSupport;
    const footer = this.props.footer;

    return (
      <div className="event">

        <div className="event__header">
          <h1 className="lead-title">{ titleLead }</h1>
          <h2 className="support-title">{ titleSupport }</h2>
        </div>

        <hr className="section-spacer" />

        <div className="event__body" {...getEventBody} />

        <div className="event__footer">
          <hr />
          <h2 className="island-title">{ footer }</h2>
          <hr />
        </div>
      </div>
    );
  }
});

module.exports = EventInfo;
