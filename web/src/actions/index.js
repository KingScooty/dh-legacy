import fetch from 'isomorphic-fetch';

// @TODO INCLUDE ERROR HANDLING

import { TOGGLE_STATUS, REQUEST_EVENT } from '../constants/ActionTypes';

/*
 * action creators
 */

export function toggleStatus(liveStatus) {
  return {
    type: TOGGLE_STATUS,
    liveStatus
  };
}

export function requestEvent(event) {
  return {
    type: REQUEST_EVENT,
    event
  };
}

export async function fetchEvent(event) {
  // return dispatch => {
    // dispatch(requestEvent(event));

  const eventInfo = await fetch(`http://www.digital-heroes.com/${event}/info?format=json`)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    });

  const eventPosts = await fetch(`http://www.digital-heroes.com/${event}/tweets?format=json`)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    });

  // console.log({eventInfo, eventPosts});
  return { eventInfo, eventPosts };

  // return dispatch(receivePosts(event, eventObject));

  // };
}
