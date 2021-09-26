import {
  REGISTER,
  LOGIN,
  LOGOUT,
  RESET_AUTH_NOTIFICATION,
} from "../actionTypes";

import AuthService from "../../pages/api/authApi";
import {
  actionPromise
} from "../../utils/reduxActions";

export const register = (data) => async (dispatch) => {
  dispatch(actionPromise(await AuthService.register(data), 'register', REGISTER, 'AUTH_'))
};

export const login = (data) => (dispatch) => {
  dispatch(actionPromise(AuthService.login(data), 'user', LOGIN, 'AUTH_'))
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT
  });
};

export const resetAuthNotification = () => (dispatch) => {
  dispatch({
    type: RESET_AUTH_NOTIFICATION
  });
};
