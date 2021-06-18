import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  SHOW_DIALOG,
  HIDE_DIALOG
} from "../constants";

export const initialState = {
  users: [],
  contextUser: null,
  isDialogOpen: false,
  isLoading: false
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
        isLoading: false
      };
    case DELETE_USER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users].filter(user => {
            if (user.id !== payload.userId) {
              return user
            }
          }),
          isLoading: false
      };
    case DELETE_USER_FAIL:
      return {
        ...state,
        users: null,
          isLoading: false
      };
    case SHOW_DIALOG:
      return {
        ...state,
        contextUser: payload ?
          payload.user :
          null,
          isDialogOpen: true
      };
    case HIDE_DIALOG:
      return {
        ...state,
        isDialogOpen: false
      };
    default:
      return state;
  }
}
