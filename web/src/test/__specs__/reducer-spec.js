/* eslint-env node, mocha */

// import { fromJS } from 'immutable';
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
      liveStatus: true
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
});
