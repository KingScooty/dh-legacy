/* eslint-env node, mocha */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import nock from 'nock';
import { expect } from 'chai';

import * as actions from '../../actions';
import * as types from '../../constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it.only('creates RECEIVE_EVENT when fetching events has been done', () => {
    const expectedInfoResponse = {
      value: {
        type: 'info',
        html: '<div>Event Info</div>'
      }
    };

    const expectedPostsResponse = {
      value: {
        type: 'tweet',
        html: '<div>Tweet</div>'
      }
    };

    nock('http://www.digital-heroes.com/')
      .get('/2015/info?format=json')
      .reply(200, expectedInfoResponse);

    nock('http://www.digital-heroes.com/')
      .get('/2015/tweets?format=json')
      .reply(200, expectedPostsResponse);

    const expectedActions = [
      {
        event: '2015',
        type: types.REQUEST_EVENT
      },
      {
        type: types.RECEIVE_EVENT,
        event: '2015',
        eventInfo: expectedInfoResponse,
        posts: expectedPostsResponse
      }
    ];
    const store = mockStore();

    return store.dispatch(actions.fetchEvent('2015'))
      .then(() => { // return of async actions
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });
});
