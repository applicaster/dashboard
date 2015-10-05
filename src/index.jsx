import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import boxOrder from './middleware/boxOrder';
import firebaseMiddleware from './middleware/firebase';
import parseMiddleware from './middleware/parse';
import reducer from './reducer';
import App from './components/App';
import Firebase from 'firebase';
import axios from 'axios';

require('../node_modules/flexboxgrid/dist/flexboxgrid.css');

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  boxOrder,
  firebaseMiddleware(Firebase, window.FIREBASE_APP),
  parseMiddleware(axios, window)
)(createStore);

const actions = {
  reduxHeartbeatCB() {
    return {
      type: 'HEARTBEAT',
    };
  },
  getBoxsListAction() {
    return {
      type: 'GETBOXLIST',
    };
  },
  handleDrop(squareIndex, boxId) {
    return {
      type: 'HANDLE_DROP',
      squareIndex: squareIndex,
      boxId: boxId,
    };
  },
  toggleEditMode(toggleFlag) {
    return {
      type: 'TOGGLE_EDIT_MODE',
      toggleFlag: toggleFlag,
    };
  },
};

function mapStateToProps(state) {
  return {
    heartbeat: state.get('heartbeat'),
    initialized: state.get('initialized'),
    boxList: state.get('boxList'),
    inEditMode: state.get('inEditMode'),
  };
}

const AppConnector = connect(mapStateToProps, actions)(App);
const store = createStoreWithMiddleware(reducer);

React.render(
  <Provider store={store}>
    {() => <AppConnector/>}
  </Provider>,
  document.getElementById('app')
);
