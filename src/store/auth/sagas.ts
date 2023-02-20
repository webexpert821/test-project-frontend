import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { PRIVATE_ROUTES } from "src/config/routes";

import {
  loginFailure,
  loginSuccess,
  signupSuccess,
  signupFailure
} from "./actions";
import { LOGIN_REQUEST, SIGNUP_REQUEST } from "./actionTypes";
import { IAuth } from "./types";

interface SigninProps {
    email: string;
    password: string;
  }

interface SignupProps {
  firstName: string;
  lastName: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  phone: string;
  password: string;
}

const login = async (payload: SigninProps) => {
  const { data } = await axios.post<IAuth>(
    `${PRIVATE_ROUTES.backendURL}/api/users/signin`,
    { email: payload.email, password: payload.password },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }
  );
  // eslint-disable-next-line no-console
  console.log({ data })
  return data;
};

const signup = async (payload: SignupProps) => {
  const { data } = await axios.post<IAuth>(
     `${PRIVATE_ROUTES.backendURL}/api/users/signup`,
    { ...payload },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }
  );

  return data;
};

function* loginSaga(action: any) {
  try {
    const response: { token: string } = yield call(login, {
      email: action.payload.values.email,
      password: action.payload.values.password
    });

    yield put(
      loginSuccess({
        token: response.token
      })
    );
    action.payload.callback(response.token);
  } catch (e: any) {
    yield put(
      loginFailure({
        error: e.message
      })
    );
  }
}

function* signupSaga(action: any) {
  try {
    const response: { token: string } = yield call(signup, {
      firstName: action.payload.values.firstName,
      lastName: action.payload.values.lastName,
      email: action.payload.values.email,
      address1:action.payload.values.address1,
      address2: action.payload.values.address2,
      city: action.payload.values.city,
      state: action.payload.values.state,
      phone: action.payload.values.phone,
      password: action.payload.values.password
    });

    yield put(
      signupSuccess({
        token: response.token
      })
    );
    localStorage.setItem('token', response.token);
    // eslint-disable-next-line no-console
    action.payload.callback(response.token);
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.log({ e })
    yield put(
      signupFailure({
        error: e.response.data
      })
      );

      action.payload.callback(e.response.data);
  }
}

function* authSaga() {
  yield all([takeLatest(LOGIN_REQUEST, loginSaga)]);
  yield all([takeLatest(SIGNUP_REQUEST, signupSaga)]);
}

export default authSaga;