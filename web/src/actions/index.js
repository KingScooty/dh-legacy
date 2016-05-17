// FETCH_ARCHIVED_TWEETS
// SUBSCRIBE_TO_LIVE_TWEETS
// GET_EVENT_INFO

// SELECT_EVENT
// @TODO INCLUDE ERROR HANDLING

// export const SELECT_EVENT = 'SELECT_EVENT';
//
// export function selectEvent(event) {
//   return {
//     type: SELECT_EVENT,
//     event
//   };
// }
//
// export const REQUEST_POSTS = 'REQUEST_POSTS';
//
// export function requestPosts(event) {
//   return {
//     type: REQUEST_POSTS,
//     event
//   };
// }
//
// export const RECEIVE_POSTS = 'RECEIVE_POSTS';
//
// export function receivePosts(event, json) {
//   return {
//     type: RECEIVE_POSTS,
//     event,
//     // might need to update this
//     posts: json.data.children.map(child => child.data),
//     receivedAt: Date.now()
//   };
// }


// export const GET_POSTS = 'GET_POSTS';

export function getPosts() {
  console.log('Is this action getting called???');
  return {
    type: GET_POSTS,

  };
}
