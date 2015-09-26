import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';
import App from './components/App';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
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
