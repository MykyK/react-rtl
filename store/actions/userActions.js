import {
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  UPDATE_USER_IN_COMPANY,
  DELETE_COMPANY_FROM_USER,
  ADD_COMPANY_TO_USER,
  RESET_USER_NOTIFICATION,
  DELETE_USER,
  GET_EXPANDED_STATUS,
  HIDE_DIALOG,
  SHOW_DIALOG,
  GET_USER,
} from "../actionTypes";

import UserService from "../../pages/api/usersApi";
import {
  actionPromise
} from "../../utils/reduxActions";


export const getUsers = (params) => async (dispatch) => {
  await dispatch(actionPromise(UserService.getUsers(params), 'users', GET_USERS, 'USER_'))
};


export const updateUser = (data) => async (dispatch) => {
  await dispatch(actionPromise(UserService.updateUser(data), 'updatedUser', UPDATE_USER, 'USER_'))
};

export const updateUserInCompany = (data) => async (dispatch) => {
  await dispatch(actionPromise(UserService.updateUserInCompany(data), 'updateUserInCompany', UPDATE_USER_IN_COMPANY, 'USER_'))
};

export const deleteCompanyFromUser = (data) => async (dispatch) => {
  await dispatch(actionPromise(UserService.deleteCompanyFromUser(data), 'deleteCompanyFromUser', DELETE_COMPANY_FROM_USER, 'USER_'))
};

export const createUser = (data) => async (dispatch) => {
  await dispatch(actionPromise(UserService.createUser(data), 'createUser', CREATE_USER, 'USER_'))

};

export const deleteUser = (userId) => async (dispatch) => {
  await dispatch(actionPromise(UserService.deleteUser(userId), 'deletedUser', DELETE_USER, 'USER_'))
};

export const getUser = (userId) => async (dispatch) => {
  await dispatch(actionPromise(UserService.getUser(userId), 'user', GET_USER, 'USER_'))
};

export const addCompanyToUserAction = (data) => async (dispatch) => {
  await dispatch(actionPromise(UserService.addCompanyToUser(data), 'addCompanyToUser', ADD_COMPANY_TO_USER, 'USER_'))
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

export const closeDialog = () => (dispatch) => {
  dispatch({
    type: HIDE_DIALOG,
  })
};

export const getRowExpandedStatus = (isExpanded) => (dispatch) => {
  dispatch({
    type: GET_EXPANDED_STATUS,
    payload: isExpanded
  })
}

export const resetUserNotification = () => (dispatch) => {
  dispatch({
    type: RESET_USER_NOTIFICATION
  });
};
