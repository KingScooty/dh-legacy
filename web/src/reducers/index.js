// import { combineReducers } from 'redux';
import { List, Map } from 'immutable';
import { combineReducers } from 'redux';

const initialState = require('../store/initialState')().posts;

const init = List(initialState);

// const init = List(initialState);

// console.log(init);

// import {
//   GET_POSTS
// } from '../actions';

const getPosts = (state = init, action) => {
  switch (action.type) {
    // case 'GET_POSTS':
    //   return state.posts.push(Map(action.posts));
    default:
      return state;
  }
};

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
