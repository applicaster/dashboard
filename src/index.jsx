import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import firebaseMiddleware from './middleware/firebase';
import reducer from './reducer';
import App from './components/App';
import Firebase from 'firebase';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  firebaseMiddleware(Firebase, window.FIREBASE_APP)
)(createStore);

const actions = {
  reduxHeartbeatCB() {
    return {
      type: 'HEARTBEAT',
    };
  },
};

function mapStateToProps(state) {
  return {
    heartbeat: state.get('heartbeat'),
    initialized: state.get('initialized'),
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
