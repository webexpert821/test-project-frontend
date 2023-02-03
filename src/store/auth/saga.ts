import { put, takeLatest } from 'redux-saga/effects';

import { loginAction, loginSuccess } from './reducers';

function* executeLogin() {
  yield put(loginSuccess(true));
}

export function* login() {
  yield takeLatest(loginAction, executeLogin);
}
