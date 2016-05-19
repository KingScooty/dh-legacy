/* eslint-env node, mocha */

var chai = require('chai');
import { expect } from 'chai';

import * as actions from '../../actions';
import * as types from '../../constants/ActionTypes';

describe('Actions', () => {
  it('creates an action to toggle live status', () => {
    const liveStatus = true;
    const expectedAction = {
      type: types.TOGGLE_STATUS,
      liveStatus
    };
    expect(actions.toggleStatus(liveStatus)).to.deep.equal(expectedAction);
  });

  it('creates an action to request events', () => {
    const event = '2016';
    const expectedAction = {
      type: types.REQUEST_EVENT,
      event
    };
    expect(actions.requestEvent(event)).to.deep.equal(expectedAction);
  });
});
