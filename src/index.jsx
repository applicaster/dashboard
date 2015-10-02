import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import firebaseMiddleware from './middleware/firebase';
import parseMiddleware from './middleware/parse';
import reducer from './reducer';
import App from './components/App';
import Firebase from 'firebase';
import Parse from 'parse';
import axios from 'axios';

require('../node_modules/flexboxgrid/dist/flexboxgrid.css');

Parse.initialize(
  'IabQYOcnNrKwubDzb0iR6PwebMe74IXDQNw6MpDG',
  '3xTWMkRMQUUcC4brbov49iiemWHf34njY83IWWYO'
);

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
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
};

function mapStateToProps(state) {
  return {
    heartbeat: state.get('heartbeat'),
    initialized: state.get('initialized'),
    boxList: state.get('boxList'),
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
