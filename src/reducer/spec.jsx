import test from 'tape';
import {Map} from 'immutable';
import reducer, {HEARTBEAT_STATUSES} from './';

test('reducer', (assert) => {
  const initalState = Map();
  const action = {
    type: 'HEARTBEAT',
  };
  const nextState = reducer(initalState, action);
  assert.equal(
    nextState.toJS().heartbeat,
    HEARTBEAT_STATUSES.ERROR,
    'Should return heartbeat "ERROR" by default if no middleware is set.'
  );
  assert.equal(
    nextState.toJS().initialized,
    true,
    'Should initialize connection state.'
  );
  assert.end();
});
