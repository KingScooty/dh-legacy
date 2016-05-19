// FETCH_ARCHIVED_TWEETS
// SUBSCRIBE_TO_LIVE_TWEETS
// GET_EVENT_INFO

// SELECT_EVENT
// @TODO INCLUDE ERROR HANDLING

import { TOGGLE_STATUS } from '../constants/ActionTypes';

/*
 * action creators
 */

export function toggleStatus(liveStatus) {
  return {
    type: TOGGLE_STATUS,
    liveStatus
  };
}
