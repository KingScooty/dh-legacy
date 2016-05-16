import { connect } from 'react-redux';
import { getPosts } from '../../actions';

import ArchiveFeed from './ArchiveFeed';

export const ArchiveFeedContainer = connect(
  function mapStateToProps(state) {
    return { posts: state }
  },
  function mapDispatchToProps(dispatch) {
    return {
      getPosts: dispatch(getPosts())
    }
  }
)(ArchiveFeed);
