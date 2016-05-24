/* eslint-env node, mocha */

import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import { default as reducer, initialState } from '../../reducers';
import * as types from '../../constants/ActionTypes';

// const posts = require('../../store/initialState')().posts;

describe('Reducer', () => {
  it('should return the initial state', () => {
    const initialReducerState = reducer(undefined, {});
    expect(initialReducerState).to.deep.equal(initialState);
  });

  it('handles TOGGLE_STATUS', () => {
    const action = {
      type: types.TOGGLE_STATUS,
      isLive: true
    };

    const nextState = reducer(initialState, action);
    expect(nextState.get('isLive')).to.equal(true);
  });

  it('handles REQUEST_EVENT', () => {
    const action = {
      type: types.REQUEST_EVENT,
      event: '2015'
    };

    const nextState = reducer(initialState, action);
    expect(nextState.get('selectedEvent')).to.equal('2015');
    expect(nextState.get('isFetching')).to.equal(true);
  });

  it('handles RECEIVE_EVENT', () => {
    const expectedEventObject = {
      event: '2016',
      eventInfo: {
        type: 'info',
        html: '<div>Event Info</div>'
      },
      posts: [{
        text: 'some tweet text',
        type: 'tweet'
      }]
    };

    const action = {
      type: types.RECEIVE_EVENT,
      event: '2015',
      fetchedPostCount: 1,
      eventInfo: expectedEventObject.eventInfo,
      posts: expectedEventObject.posts
    };

    const customInitialState = initialState.set('isFetching', true);
    expect(customInitialState.get('isFetching')).to.equal(true);

    const nextState = reducer(customInitialState, action);

    expect(nextState.get('isFetching')).to.equal(false);
    expect(nextState.get('eventInfo')).to.deep.equal(Map(expectedEventObject.eventInfo));
    expect(nextState.get('fetchedPostCount')).to.equal(1);
    expect(nextState.get('posts')).to.deep.equal(fromJS(expectedEventObject.posts));
  });
});
