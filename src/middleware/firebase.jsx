import {HEARTBEAT_STATUSES} from '../reducer';

export default (Firebase, firebaseApp) => () => next => action => {
  switch (action.type) {
  case 'HEARTBEAT':
    const connectedRef = new Firebase(`https://${firebaseApp}.firebaseio.com/.info/connected`);
    connectedRef.on('value', (snap) => {
      if (snap.val() === true) {
        action.status = HEARTBEAT_STATUSES.OK;
      } else {
        action.status = HEARTBEAT_STATUSES.ERROR;
      }
      next(action);
    });
    break;
  default:
    next(action);
    break;
  }
};
