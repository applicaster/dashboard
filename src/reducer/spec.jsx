import test from 'tape';
import {Map} from 'immutable';
import reducer from './';

test('reducer', (assert) => {
  const initalState = Map();
  const action = {
    type: 'HEARTBEAT',
  };
  const nextState = reducer(initalState, action);
  assert.deepEqual(
    nextState.toJS(),
    {heartbeat: 'OK'},
    'Should return "OK" when dispacthing HEARTBEAT action.'
  );
  assert.end();
});
