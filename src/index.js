import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.min.css';

import App from './App';
import snaildiskApp from './reducers';
import { setToken } from './actions/auth';
import { getAndSetAccessToken } from './utils';
import registerServiceWorker from './registerServiceWorker';

// Initialize the redux store
const store = createStore(snaildiskApp);

// Get and set the current authentification state
const token = getAndSetAccessToken();
store.dispatch(setToken(token));

// Render the app
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
