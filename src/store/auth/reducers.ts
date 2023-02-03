import { createSlice, createAction } from '@reduxjs/toolkit';

import { AUTH_ACTIONS } from './action';

interface StateProps {
  signedIn: boolean;
}

const authInitialState: StateProps = {
  signedIn: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    logout: (state) => {
      state.signedIn = false;
    },
    loginSuccess: (state, action) => {
      state.signedIn = action.payload;
    }
  }
});

export default authSlice.reducer;
export const { logout, loginSuccess } = authSlice.actions;
export const selectSignedIn = (state: { auth: StateProps }) => state.auth.signedIn;
export const loginAction = createAction(AUTH_ACTIONS.LOGIN_ACTION);
