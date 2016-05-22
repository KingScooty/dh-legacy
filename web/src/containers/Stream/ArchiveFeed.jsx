const React = require('react');
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { toJS } from 'immutable';

var Post = require('../../components/Post');

var ArchiveFeed = React.createClass({
  propTypes: {
    posts: React.PropTypes.array.isRequired
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedEvent !== this.props.selectedEvent) {
      const { dispatch, selectedEvent } = nextProps;
      dispatch(actions.fetchEventIfNeeded(selectedEvent));
    }
  },

  renderPosts: function () {
    return this.props.posts.map(function (post, index) {
      return <Post {...post} key={ index } />;
    });
  },

  render: function () {
    var posts = this.renderPosts();

    return (
      <div>
        <h1>ARCHIVE FEED!</h1>
        { posts }
      </div>
    );
  }
});

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

module.exports = connect(mapStateToProps)(ArchiveFeed);
