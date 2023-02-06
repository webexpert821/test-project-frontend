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
     await axios
      .post(`${PRIVATE_ROUTES.backendURL}/api/users`, values)
      .then((response) => {
        const token = response.data.token;
        const decoded = jwtDecode(token)
        const username = Object(decoded).user.firstName;
        localStorage.setItem("username", username);
        console.log(token);
        dispatch({
          type: AUTH_ACTIONS.LOGIN_ACTION,
          payload: decoded
        })
        toast.success("Successfully registered");
      })
      .catch((err) => {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        toast.error(`${err.response.data.msg}`);
      });
}