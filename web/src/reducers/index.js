import { Map, fromJS } from 'immutable';
import { TOGGLE_STATUS, REQUEST_EVENT, RECEIVE_EVENT } from '../constants/ActionTypes';

export const initialState = fromJS({
  selectedEvent: 'halloween15',
  isLive: false,
  isFetching: false,
  eventInfo: {},
  fetchedPostCount: 0,
  posts: []
});

const events = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_STATUS:
      return state.set('isLive', action.isLive);
    case REQUEST_EVENT:
      return state.merge(fromJS({
        selectedEvent: action.event,
        isFetching: true
      }));
    case RECEIVE_EVENT:
      console.log('REDUCER RECEIVED EVENT!');
      return state.merge(fromJS({
        isFetching: false,
        eventInfo: action.eventInfo,
        fetchedPostCount: action.fetchedPostCount,
        posts: action.posts
      }));
    default:
      return state;
  }
};

export default events;
