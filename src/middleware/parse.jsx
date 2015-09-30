export default (Parse) => () => next => action => {
  switch (action.type) {
  case 'GETBOXLIST':
    const Box = Parse.Object.extend('Box');
    const query = new Parse.Query(Box);
    query.find({
      success: (results) => {
        action.boxList = results;
        next(action);
      },
      error: (error) => {
        throw new Error(error);
      },
    });
    break;
  default:
    next(action);
    break;
  }
};
