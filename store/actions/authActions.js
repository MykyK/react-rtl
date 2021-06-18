import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_REQUEST,
} from "../constants";

import AuthService from "../../pages/api/auth";


export const register = (data) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST
    });
    const response = await AuthService.register(data)
    dispatch({
      type: REGISTER_SUCCESS
    });
    return response
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL
    });
    return error
  }
};

export const login = (data) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST
    });
    const response = await AuthService.login(data)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user: data
      }
    });
    return response
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL
    });
    return error
  }
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT
  });
};
