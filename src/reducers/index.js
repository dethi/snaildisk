import { combineReducers } from 'redux';

import auth from './auth';
import account from './account';

const snaildiskReducers = combineReducers({
  auth,
  account
});

export default snaildiskReducers;
