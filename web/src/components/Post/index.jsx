var React = require('react');

var Post = React.createClass({

  render: function() {

    return (
      <div className="stream-post">
        <div className="stream-post__meta">{this.props.date}</div>
        <div className="stream-body">{this.props.title}</div>
        <div className="stream-media">Media goes here</div>
      </div>
    );
  }
});

module.exports = Post;
