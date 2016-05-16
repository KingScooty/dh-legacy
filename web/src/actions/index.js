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
    posts: [
      {
        "_id": "207933355151458300",
        "_rev": "2-9156c550a7e665bd862b62417e08676d",
        "tweet_id": 207933355151458300,
        "screen_name": "KingScooty",
        "text": "@AlanBithell Testing persistent storage. #digitalheroes2012",
        "profile_image_url": "http://a0.twimg.com/profile_images/1427254999/profile-picture_normal.jpg",
        "timestamp": "Wed May 30 20:35:49 +0000 2012",
        "media": "",
        "type": "tweet"
      },
      {
        "_id": "207933355151458300",
        "_rev": "2-9156c550a7e665bd862b62417e08676d",
        "tweet_id": 207933355151458300,
        "screen_name": "KingScooty",
        "text": "@AlanBithell Testing persistent storage. #digitalheroes2012",
        "profile_image_url": "http://a0.twimg.com/profile_images/1427254999/profile-picture_normal.jpg",
        "timestamp": "Wed May 30 20:35:49 +0000 2012",
        "media": "",
        "type": "tweet"
      },
      {
        "_id": "207933355151458300",
        "_rev": "2-9156c550a7e665bd862b62417e08676d",
        "tweet_id": 207933355151458300,
        "screen_name": "KingScooty",
        "text": "@AlanBithell Testing persistent storage. #digitalheroes2012",
        "profile_image_url": "http://a0.twimg.com/profile_images/1427254999/profile-picture_normal.jpg",
        "timestamp": "Wed May 30 20:35:49 +0000 2012",
        "media": "",
        "type": "tweet"
      }
    ]
  };
}
