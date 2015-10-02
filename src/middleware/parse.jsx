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
  default:
    next(action);
    break;
  }
};
