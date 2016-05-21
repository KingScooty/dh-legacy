import { fromJS } from 'immutable';
import { TOGGLE_STATUS } from '../constants/ActionTypes';

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
      return state.set('isLive', action.liveStatus);
    case 'REQUEST_POSTS':
      //return //state.set('isFetching', )
    case 'RECEIVE_POSTS':
    default:
      return state;
  }
};

export default events;
