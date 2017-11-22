import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.min.css';

import App from './App';
import snaildiskReducers from './reducers';
import snaildiskSaga from './sagas';
import { setToken } from './actions/auth';
import api from './api';
import { getAndSetAccessToken } from './utils';
import registerServiceWorker from './registerServiceWorker';

// Initialize the redux store
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({});
const store = createStore(
  snaildiskReducers,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

// Run the saga
sagaMiddleware.run(snaildiskSaga);

// Get and set the current authentification state
const token = getAndSetAccessToken();
store.dispatch(setToken(token));
api.setAccessToken(token);

// Render the app
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
