import { put, takeEvery, takeLatest } from 'redux-saga/effects';

import * as auth from '../actions/auth';
import * as account from '../actions/account';
import api from '../api';

function* fetchAccount(action) {
  try {
    const info = yield api.getAccount();
    yield put(account.fetchAccountSucceeded(info));
  } catch (e) {
    yield put(account.fetchAccountFailed(e.message));
  }
}

function* fetchSpaceUsage(action) {
  try {
    const spaceUsage = yield api.getSpaceUsage();
    yield put(account.fetchSpaceUsageSucceeded(spaceUsage));
  } catch (e) {
    yield put(account.fetchSpaceUsageFailed(e.message));
  }
}

function* login(action) {
  const token = action.token;
  api.setAccessToken(token);

  yield put(auth.setToken(token));

  if (token !== null) {
    yield fetchAccount();
    yield fetchSpaceUsage();
  }
}

function* snaildiskSaga() {
  yield takeEvery(auth.LOGIN, login);
  yield takeLatest(account.FETCH_ACCOUNT_REQUESTED, fetchAccount);
  yield takeLatest(account.FETCH_SPACE_USAGE_REQUESTED, fetchSpaceUsage);
}

export default snaildiskSaga;
