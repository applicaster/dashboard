import findIndex from 'lodash/array/findIndex';
import map from 'lodash/collection/map';
import sortBy from 'lodash/collection/sortBy';
export default store => next => action => {

  switch (action.type) {
  case 'HANDLE_DROP':
    const {boxId, squareIndex} = action;
    const state = store.getState();
    const draggedIndex = findIndex(state.get('boxList'), {objectId: boxId.id});
    const boxList = state.get('boxList');
    const newBoxList = sortBy(map(boxList, (box, index)=>{
      if (index <= squareIndex && index >= draggedIndex) {
        if (index === draggedIndex) {
          box.order = squareIndex;
        } else {
          box.order = index - 1;
        }
      }
      if (index >= squareIndex && index <= draggedIndex) {
        if (index === draggedIndex) {
          box.order = squareIndex;
        } else {
          box.order = index + 1;
        }
      }
      return box;
    }), 'order');
    action.boxList = newBoxList;
    store.dispatch({
      type: 'UPDATE_BOX_LIST',
      boxList: newBoxList,
    });
    next(action);
    break;
  default:
    next(action);
    break;
  }
};
