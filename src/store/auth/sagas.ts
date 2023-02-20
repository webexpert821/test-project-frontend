import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "src/config/routes";

import {
  loginFailure,
  loginSuccess,
  signupSuccess,
  signupFailure,
  getAccountRequest,
  getAccountSuccess
} from "./actions";
import { LOGIN_REQUEST, SIGNUP_REQUEST, GETACCOUNT_REQUEST } from "./actionTypes";
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

interface getAccountProps {
  email: string;
  firstName: string;
  lastName: string;
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

const getAccount = async(payload: { token: string }) => {
  // eslint-disable-next-line no-console
  console.log(payload.token)
  const { data } = await axios.post(
    `${PRIVATE_ROUTES.backendURL}/api/users/me`,
    {...payload},
     {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }
  )
  return data;
}

function* loginSaga(action: any) {
  try {
    const response: { accessToken: string, refreshToken: string, user: SignupProps } = yield call(login, {
      email: action.payload.values.email,
      password: action.payload.values.password
    });

    yield put(
      loginSuccess({
        token: response.accessToken
      })
    );
    localStorage.setItem('refreshToken', response.refreshToken);
    localStorage.setItem('accessToken', response.accessToken);
    location.replace(PUBLIC_ROUTES.home);
  } catch (e: any) {
    yield put(
      loginFailure({
        error: e.response.data
      })
    );
  }
}

function* signupSaga(action: any) {
  try {
    const response: { accessToken: string, refreshToken: string, user: SignupProps} = yield call(signup, {
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
        token: response.accessToken
      })
    );
    localStorage.setItem('refreshToken', response.refreshToken);
    localStorage.setItem('accessToken', response.accessToken);
    location.replace(PUBLIC_ROUTES.signin);
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.log({ e })
    yield put(
      signupFailure({
        error: e.response.data
      })
    );
  }
}

function* getAccountSaga(action: any) {
  try {
    // eslint-disable-next-line no-console
    const response: { user: getAccountProps } = yield call(getAccount, {
      token: action.payload.token
    })
    
    // eslint-disable-next-line no-console
    console.log(response.user.email);
    yield put(
      getAccountSuccess({
        hasInfo: true,
        email: response.user.email,
        firstName: response.user.firstName,
        lastName: response.user.lastName
      })
    )
  } catch(e: any) {
    // eslint-disable-next-line no-console
    console.log(e)
  }
}

function* authSaga() {
  yield all([takeLatest(LOGIN_REQUEST, loginSaga)]);
  yield all([takeLatest(SIGNUP_REQUEST, signupSaga)]);
  yield all([takeLatest(GETACCOUNT_REQUEST, getAccountSaga)]);
}

export default authSaga;