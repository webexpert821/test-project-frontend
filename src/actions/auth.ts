/* eslint-disable no-console */
import axios from 'axios'
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { PRIVATE_ROUTES } from 'src/config/routes';
import { AUTH_ACTIONS } from 'src/store/auth/action';

interface StateProps {
  firstName: string;
  lastName: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  phone: string;
  password: string;
  confirmPass: string;
}

export const signUpAction = (values: StateProps) => async (dispatch: any) => {
    console.log({ values })
     await axios
      .post(`${PRIVATE_ROUTES.backendURL}/api/users/signup`, values)
      .then((response) => {
        console.log({ response })
        const userInfo = response.data;
        const username = Object(userInfo).firstName;
        console.log({ username });
        localStorage.setItem('username', username);
        dispatch({
          type: AUTH_ACTIONS.LOGIN_ACTION,
          payload: userInfo
        })
        toast.success("Successfully registered");
      })
      .catch((err) => {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        toast.error(`${err.response.data}`);
      });
}