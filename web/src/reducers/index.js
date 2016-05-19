import { fromJS } from 'immutable';
import { TOGGLE_STATUS } from '../constants/ActionTypes';
const posts = require('../store/initialState')().posts;

export const initialState = fromJS({
  selectedEvent: 'halloween15',
  isLive: false,
  isFetching: false,
  lastUpdated: 0,
  eventInfo: {},
  fetchedPostCount: 4,
  posts: posts
});

const events = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_STATUS:
      return state.set('isLive', action.liveStatus);
    // case 'REQUEST_POSTS':
    //   return state.posts.push(Map(action.posts));
    case 'RECEIVE_POSTS':
    default:
      return state;
  }
};

export default events;
