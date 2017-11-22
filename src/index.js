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
import { login } from './actions/auth';
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

// Get and set the current auth state
const token = getAndSetAccessToken();
store.dispatch(login(token));

// Render the app
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
