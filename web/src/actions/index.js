import fetch from 'isomorphic-fetch';

// @TODO INCLUDE ERROR HANDLING

import { TOGGLE_STATUS, REQUEST_EVENT, RECEIVE_EVENT } from '../constants/ActionTypes';

/*
 * action creators
 */

export function toggleStatus(liveStatus) {
  return {
    type: TOGGLE_STATUS,
    isLive: liveStatus
  };
}

export function requestEvent(event) {
  return {
    type: REQUEST_EVENT,
    event
  };
}

export function receiveEvent(event, json) {
  return {
    type: RECEIVE_EVENT,
    event,
    eventInfo: json.eventInfo.value,
    fetchedPostCount: json.eventPosts.length,
    posts: json.eventPosts.map(post => post.value)
  };
}

export function fetchEvent(event) {
  return async dispatch => {
    dispatch(requestEvent(event));

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

    const eventObject = { eventInfo, eventPosts };
    return dispatch(receiveEvent(event, eventObject));
  };
}
