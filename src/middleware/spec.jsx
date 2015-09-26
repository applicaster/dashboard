// see http://rackt.github.io/redux/docs/recipes/WritingTests.html
// in the Middleware section

import test from 'tape';
import firebaseMiddleware from './firebase';
import {HEARTBEAT_STATUSES} from '../reducer';

// Factory for Firenase custom mock class that mocks the 'on' method
// The Factory takes the 'returnValue' value as parameter to conterol
// the mocked result.
const firebaseMockCreator = (returnValue) => {
  return class FirebaseMock {
    on(eventType, callback) {
      const snapshot = {
        val() {
          return returnValue;
        },
      };
      callback(snapshot);
    }
  };
};

// Taken from http://rackt.github.io/redux/docs/recipes/WritingTests.html
const createFakeStore = fakeData => ({
  getState() {
    return fakeData;
  },
});

// Inspired from http://rackt.github.io/redux/docs/recipes/WritingTests.html
// with one expection we pass the firebase mock class as a paramter so
// we can controlled its mocked value using firebaseMockCreator
const dispatchWithStoreOf = (firebaseMock, storeData, action) => {
  let dispatched = null;
  const dispatch = firebaseMiddleware(firebaseMock)(
    createFakeStore(storeData)
  )(actionAttempt => dispatched = actionAttempt);
  dispatch(action);
  return dispatched;
};

test('firebaseMiddleware', (assert) => {
  const action = {
    type: 'HEARTBEAT',
  };

  assert.equal(
    dispatchWithStoreOf(firebaseMockCreator(true), {}, action).status,
    HEARTBEAT_STATUSES.OK,
    'Should return OK when Firebases connection returns true.'
  );

  assert.equal(
    dispatchWithStoreOf(firebaseMockCreator(false), {}, action).status,
    HEARTBEAT_STATUSES.ERROR,
    'Should return ERROR when Firebases connection returns false.'
  );

  assert.end();
});
