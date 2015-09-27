import {Map} from 'immutable';

export const HEARTBEAT_STATUSES = {
  OK: 'OK',
  ERROR: 'Connection Error',
  ININTIALIZING_CONNECTION: 'Initializing Connection...',
};

const reduxHeartbeat = (state, status) => {
  let newStatus;
  switch (status) {
  case undefined:
    newStatus = HEARTBEAT_STATUSES.ERROR;
    break;
  case HEARTBEAT_STATUSES.ERROR:
    if (!state.get('initialized')) {
      newStatus = HEARTBEAT_STATUSES.ININTIALIZING_CONNECTION;
    }
    break;
  default:
    break;
  }
  return state.set('heartbeat', newStatus || status).set('initialized', true);
};

export default function(state = Map(), action) {
  switch (action.type) {
  case 'HEARTBEAT':
    return reduxHeartbeat(state, action.status);
  default:
    return state;
  }
}
