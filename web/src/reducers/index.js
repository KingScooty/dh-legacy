// import { combineReducers } from 'redux';
import { List, Map } from 'immutable';
import { combineReducers } from 'redux';

const posts = require('../store/initialState')().posts;

const initialState = Map({
  selectedEvent: 'halloween15',
  isLive: false,
  isFetching: false,
  lastUpdated: 0,
  eventInfo: {},
  fetchedPostCount: 2,
  posts: posts
});


// const init = List(initialState);



const getPosts = (state = initialState, action) => {
  switch (action.type) {
    // case 'GET_POSTS':
    //   return state.posts.push(Map(action.posts));
    default:
      return state;
  }
};



// function posts(state = initialState, action) {
//   switch (action.type) {
//     case REQUEST_POSTS:
//       return {
//         ...state,
//         isFetching: true
//       };
//     // case RECEIVE_POSTS:
//     //   return Object.assign({}, state, {
//     //     isFetching: false,
//     //     didInvalidate: false,
//     //     items: action.posts,
//     //     lastUpdated: action.receivedAt
//     //   })
//     default:
//       return state
//   }
// }

const toggleStatus = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_STATUS':
      return action.liveStatus;
    default:
      return state;
  }
};

// export default getPosts;

const rootReducer = combineReducers({
  isLive: toggleStatus,
  posts: getPosts
});

export default rootReducer;

// export default combineReducers({
//   getPosts: getPosts,
//   setStatus: setStatus
// });

// import {
//   SELECT_EVENT,
//   REQUEST_POSTS, RECEIVE_POSTS
// } from '../actions';
//
// function selectedEvent(state = 'halloween15', action) {
//   switch (action.type) {
//     case SELECT_EVENT:
//       return action.event;
//     default:
//       return state;
//   }
// }
//
// function posts(state = {
//   isFetching: false,
//   didInvalidate: false,
//   items: []
// }, action) {
//   switch (action.type) {
//     case REQUEST_POSTS:
//       return Object.assign({}, state, {
//         isFetching: true,
//         didInvalidate: false
//       });
//     case RECEIVE_POSTS:
//       return Object({}, state, {
//         isFetching: false,
//         didInvalidate: false,
//         items: action.posts,
//         lastUpdated: action.receivedAt
//       });
//     default:
//       return state;
//   }
// }
//
// function postsByEvent(state = {}, action) {
//   switch (action.type) {
//     case RECEIVE_POSTS:
//     case REQUEST_POSTS:
//       return Object.assign({}, state, {
//         [action.event]: posts(state[action.event], action)
//       });
//     default:
//       return state;
//   }
// }
//
// const rootReducer = combineReducers({
//   postsByEvent,
//   selectedEvent
// });
//
// export default rootReducer;
