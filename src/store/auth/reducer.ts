import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  GETACCOUNT_REQUEST,
  GETACCOUNT_SUCCESS,
  LOGOUT_REQUEST
} from "./actionTypes";

import { AuthActions, AuthState } from "./types";

const initialState: AuthState = {
  pending: false,
  hasInfo: false,
  token: "",
  email: "",
  firstName: "",
  lastName: "",
  error: null
};

const reducers = (state = initialState, action: AuthActions) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        pending: true
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        pending: false,
        token: "",
        error: action.payload.error
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        pending: false,
        token: action.payload.token,
        error: null
      };

    case LOGIN_REQUEST:
      return {
        ...state,
        pending: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        pending: false,
        token: action.payload.token,
        error: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        pending: false,
        token: "",
        error: action.payload.error
      };
    case GETACCOUNT_REQUEST: 
      return {
        ...state,
        pending: true
      };
    case GETACCOUNT_SUCCESS: 
      return {
        ...state,
        hasInfo: action.payload.hasInfo,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName
      }
    case LOGOUT_REQUEST: 
      return {
        ...state,
        hasInfo: false,
        email: "",
        firstName: "",
        lastName: ""
      }
    default:
      return {
        ...state
      };
  }
};

export default reducers;
