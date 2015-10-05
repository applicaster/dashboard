import map from 'lodash/collection/map';

export default (axios, window) => () => next => action => {
  switch (action.type) {
  case 'GETBOXLIST':
    axios({
      method: 'get',
      url: 'https://api.parse.com/1/classes/Box',
      headers: {
        'X-Parse-Application-Id': window.dashboardSettings['X-Parse-Application-Id'],
        'X-Parse-REST-API-Key': window.dashboardSettings['X-Parse-REST-API-Key'],
      },
    })
    .then((response) => {
      action.boxList = response.data.results;
      next(action);
    })
    .catch((error) => {
      throw new Error(error);
    });
    break;
  case 'UPDATE_BOX_LIST':
    const requests = map(action.boxList, (box) => {
      return {
        method: 'PUT',
        path: `https://api.parse.com/1/classes/Box/${box.objectId}`,
        body: {
          order: box.order,
        },
      };
    });
    axios({
      method: 'post',
      url: 'https://api.parse.com/1/batch',
      headers: {
        'X-Parse-Application-Id': window.dashboardSettings['X-Parse-Application-Id'],
        'X-Parse-REST-API-Key': window.dashboardSettings['X-Parse-REST-API-Key'],
      },
      data: {
        requests: requests,
      },
    })
    .then(() => {
      next(action);
    })
    .catch((error) => {
      throw new Error(error);
    });
    break;
  default:
    next(action);
    break;
  }
};
