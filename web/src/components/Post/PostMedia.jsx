var React = require('react');

var PostMedia = React.createClass({

  imgElement: function(media) {
    return media.map((media, index) => {
      return (
        <div className="stream-post__media-item" key={ index }>
          <a href={this.props.href}>
            <img src={ media.media_url } />
          </a>
        </div>
      );
    });
  },

  getMedia: function() {
    if (this.props.extended_entities &&
        this.props.extended_entities.media) {
      return this.imgElement(this.props.extended_entities.media);
    }
    else if (this.props.entities &&
             this.props.entities.media) {
      return this.imgElement(this.props.entities.media);
    }
    else if (this.props.media) {
      return this.imgElement([{ media_url: this.props.media }]);
    }
  },

  render: function() {
    const media = this.getMedia();
    if (!media) return false;

    return (
      <div className="stream-post__media">
        { media }
      </div>
    );
  }
});

module.exports = PostMedia;
