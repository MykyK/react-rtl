import {
  UPDATE_USER_IN_COMPANY_REQUEST,
  UPDATE_USER_IN_COMPANY_SUCCESS,
  UPDATE_USER_IN_COMPANY_FAIL,
  RESET_USER_NOTIFICATION,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  SHOW_DIALOG,
  HIDE_DIALOG,
  GET_USER_CONTEXT,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  ADD_COMPANY_TO_USER_REQUEST,
  ADD_COMPANY_TO_USER_SUCCESS,
  ADD_COMPANY_TO_USER_FAIL,
} from "../actionTypes";

export const initialState = {
  users: null,
  isExpanded: false,
  contextUser: null,
  dialogContext: null,
  dialogType: '',
  isDialogOpen: false,
  isLoading: true,
  notification: null
}

export default function userReducer(state = initialState, action) {
  const {
    type,
    payload
  } = action;

  switch (type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload.users.data,
          isLoading: false
      };
    case GET_USERS_FAIL:
      return {
        ...state,
        isLoading: false,
          notification: {
            message: payload.message,
            type: payload.status
          },
      };
    case CREATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
    case UPDATE_USER_REQUEST:
    case UPDATE_USER_IN_COMPANY_REQUEST:
    case ADD_COMPANY_TO_USER_REQUEST:
      return {
        ...state,
      };
    case CREATE_USER_SUCCESS:
    case CREATE_USER_FAIL:
      return {
        ...state,
        notification: {
          message: payload.message,
          type: payload.status
        },
      };
    case UPDATE_USER_SUCCESS:
    case ADD_COMPANY_TO_USER_SUCCESS:
    case UPDATE_USER_IN_COMPANY_SUCCESS:
    case DELETE_USER_SUCCESS:
    case UPDATE_USER_FAIL:
    case ADD_COMPANY_TO_USER_FAIL:
    case UPDATE_USER_IN_COMPANY_FAIL:
    case DELETE_USER_FAIL:
      return {
        ...state,
        notification: {
          message: payload.message,
          type: payload.status
        },
      };
    case SHOW_DIALOG:
      return {
        ...state,
        dialogType: payload.dialogType,
          dialogContext: payload ?
          payload.user :
          null,
          isDialogOpen: true
      };
    case HIDE_DIALOG:
      return {
        ...state,
        isDialogOpen: false
      };
    case GET_USER_CONTEXT:
      return {
        ...state,
        contextUser: payload.user,
          isExpanded: !state.isExpanded
      };
    case RESET_USER_NOTIFICATION:
      return {
        ...state,
        notification: null,
      };
    default:
      return state;
  }
}
