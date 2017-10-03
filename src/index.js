import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { getAndSetAccessToken } from './utils';

getAndSetAccessToken();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
