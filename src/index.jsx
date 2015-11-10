import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import * as actionCreators from './actions/index.js';
import reducer from './reducer';
import App from './components/App';

require('../node_modules/flexboxgrid/dist/flexboxgrid.css');

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

function mapStateToProps(state) {
  return {
    heartbeat: state.get('heartbeat'),
    initialized: state.get('initialized'),
    boxList: state.get('boxList'),
  };
}

const AppConnector = connect(mapStateToProps, actionCreators)(App);
const store = createStoreWithMiddleware(reducer);

const boxs = [
  {
    title: 'Card',
    description: 'best description ever',
    linkUrl: 'http://google.com',
    image: { url: 'https://avatars1.githubusercontent.com/u/6271277?v=3&s=460'},
  },
  {
    title: 'Card',
    description: 'best description ever',
    linkUrl: 'http://google.com',
    image: { url: 'http://www.tervela.com/stuff/contentmgr/files/0/81724e5c90c948f4ae07e8c33e662194/files/hadoop_fast.png'},
  },
];

store.dispatch(actionCreators.getBoxsListAction(boxs));

React.render(
  <Provider store={store}>
    {() => <AppConnector/>}
  </Provider>,
  document.getElementById('app')
);

