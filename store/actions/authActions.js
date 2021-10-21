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
  await dispatch(actionPromise(AuthService.register(data), 'register', REGISTER, 'AUTH_'))
};

export const login = (data) => async (dispatch) => {
  await dispatch(actionPromise(AuthService.login(data), 'user', LOGIN, 'AUTH_'))
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
