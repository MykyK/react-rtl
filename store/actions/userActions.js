import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  HIDE_DIALOG,
  SHOW_DIALOG
} from "../constants";

import UserService from "../../pages/api/usersApi";

export const getUsers = () => async (dispatch) => {
  try {
    const users = await UserService.getUsers()
    await dispatch({
      type: GET_USERS_REQUEST
    })
    await dispatch({
      type: GET_USERS_SUCCESS,
      payload: {
        users
      }
    })
  } catch (error) {
    dispatch({
      type: GET_USERS_FAIL
    })
    return console.error(error);
  }
};


export const updateUser = (userId, data) => async (dispatch) => {
  try {
    await UserService.updateUser(userId, data)
    dispatch({
      type: UPDATE_USER_REQUEST
    })
    dispatch({
      type: UPDATE_USER_SUCCESS
    })

  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL
    })
    return console.error(error);
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    await UserService.deleteUser(userId)
    dispatch({
      type: DELETE_USER_REQUEST
    })
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: {
        userId
      }
    })

  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL
    })
    return console.error(error);
  }
};

export const openDialog = (user) => (dispatch) => {
  dispatch({
    type: SHOW_DIALOG,
    payload: {
      user
    }
  })
};

export const closeDialog = () => (dispatch) => {
  dispatch({
    type: HIDE_DIALOG,
  })
};
