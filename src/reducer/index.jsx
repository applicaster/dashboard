import {Map} from 'immutable';

const reduxHeartbeat = (state) => {
  return state.set('heartbeat', 'OK');
};

export default function(state = Map(), action) {
  switch (action.type) {
  case 'HEARTBEAT':
    return reduxHeartbeat(state);
  default:
    return state;
  }
}
