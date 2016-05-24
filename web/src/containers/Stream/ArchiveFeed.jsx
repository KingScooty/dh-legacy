const React = require('react');
import { connect } from 'react-redux';
var Post = require('../../components/Post');

class ArchiveFeed extends React.Component {
  renderPosts() {
    return this.props.posts.map(function (post, index) {
      return <Post {...post} key={ index } />;
    });
  }

  render() {
    var posts = this.renderPosts();

    return (
      <div>
        <h1>ARCHIVE FEED!</h1>
        { posts }
      </div>
    );
  }
}

var mapStateToProps = function (state) {
  // return { posts: state.posts};
  console.log('ARCHIVE FEED');
  // console.log(state);
  // console.log(state.get('posts').toJS()[0]);
  // return { posts: state.get('posts').toJS() };
  return {
    selectedEvent: state.events.selectedEvent,
    posts: state.events.posts
  };
};

ArchiveFeed.propTypes = {
  posts: React.PropTypes.array.isRequired
};

// module.exports = provideHooks(hooks)(connect(mapStateToProps)(ArchiveFeed));
export default connect(mapStateToProps)(ArchiveFeed);
