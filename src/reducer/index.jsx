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

const getBoxList = (state, boxList = []) => {
  return state.set('boxList', boxList);
};

const handleDrop = (state, squareIndex, boxId, boxList) => {
  return state.set('boxList', boxList);
};

const toggleEditMode = (state, toggleFlag) => {
  return state.set('inEditMode', toggleFlag);
};

export default function(state = Map(), action) {
  switch (action.type) {
  case 'HEARTBEAT':
    return reduxHeartbeat(state, action.status);
  case 'GETBOXLIST':
    return getBoxList(state, action.boxList);
  case 'HANDLE_DROP':
    return handleDrop(state, action.squareIndex, action.boxId, action.boxList);
  case 'TOGGLE_EDIT_MODE':
    return toggleEditMode(state, action.toggleFlag);
  default:
    return state;
  }
}
