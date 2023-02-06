import { AUTH_ACTIONS } from '../auth/action';
  
  const initialState = {
    auth: {}
  };
  
  function authReducer(state = initialState, action: any) {
    const { type, payload } = action;
  
    switch (type) {
      case AUTH_ACTIONS.LOGIN_ACTION:
        return {
          ...state,
          auth: payload
        };
      default:
        return state;
    }
  }
  
  export default authReducer;