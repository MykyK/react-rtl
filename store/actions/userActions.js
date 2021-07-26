import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_IN_COMPANY_REQUEST,
  UPDATE_USER_IN_COMPANY_SUCCESS,
  UPDATE_USER_IN_COMPANY_FAIL,
  DELETE_COMPANY_FROM_USER_REQUEST,
  DELETE_COMPANY_FROM_USER_SUCCESS,
  DELETE_COMPANY_FROM_USER_FAIL,
  RESET_USER_NOTIFICATION,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  HIDE_DIALOG,
  SHOW_DIALOG,
  GET_USER_CONTEXT
} from "../actionTypes";

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


export const updateUser = (data) => async (dispatch) => {
  try {
    const response = await UserService.updateUser(data)
    dispatch({
      type: UPDATE_USER_REQUEST
    })
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: response
    })

  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL
    })
    return console.error(error);
  }
};

export const updateUserInCompany = (data) => async (dispatch) => {
  try {
    await UserService.updateUserInCompany(data)
    dispatch({
      type: UPDATE_USER_IN_COMPANY_REQUEST
    })
    dispatch({
      type: UPDATE_USER_IN_COMPANY_SUCCESS
    })

  } catch (error) {
    dispatch({
      type: UPDATE_USER_IN_COMPANY_FAIL,
      payload: error
    })
    return console.error(error);
  }
};

export const deleteCompanyFromUser = (data) => async (dispatch) => {
  try {
    await UserService.deleteCompanyFromUser(data)
    dispatch({
      type: DELETE_COMPANY_FROM_USER_REQUEST
    })
    dispatch({
      type: DELETE_COMPANY_FROM_USER_SUCCESS
    })

  } catch (error) {
    dispatch({
      type: DELETE_COMPANY_FROM_USER_FAIL,
      payload: error
    })
    return console.error(error);
  }
};

export const createUser = (data) => async (dispatch) => {
  try {
    const response = await UserService.createUser(data)
    dispatch({
      type: CREATE_USER_REQUEST
    })
    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: response
    })
  } catch (error) {
    dispatch({
      type: CREATE_USER_FAIL,
      payload: error
    })
    return console.error(error);
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    const response = await UserService.deleteUser(userId)
    dispatch({
      type: DELETE_USER_REQUEST
    })
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: {
        userId,
        response
      }
    })

  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: response
    })
  }
};

export const openDialog = (user, dialogType) => (dispatch) => {
  dispatch({
    type: SHOW_DIALOG,
    payload: {
      user,
      dialogType,
    }
  })
};

export const getUserContext = (user) => (dispatch) => {
  dispatch({
    type: GET_USER_CONTEXT,
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

export const resetUserNotification = () => (dispatch) => {
  dispatch({
    type: RESET_USER_NOTIFICATION
  });
};
