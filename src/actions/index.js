export const HEARTBEAT = 'HEARTBEAT';
export const GETBOXLIST = 'GETBOXLIST';

export function reduxHeartbeatCB() {
  return {
    type: 'HEARTBEAT',
  };
}

export function getBoxsListAction(boxList) {
  return {
    type: 'GETBOXLIST',
    boxList: boxList,
  };
}

