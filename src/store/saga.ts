import { fork, all } from 'redux-saga/effects';

import { login } from './auth/saga';

export default function* rootSaga() {
  yield all([fork(login)]);
}
