import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  LOGIN_FAIL,
  LOGOUT,
  RESET_AUTH_NOTIFICATION,
} from "../actionTypes";

export const getLocalStorage = (item) => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(item);
  }
  return null;
}

const user = JSON.parse(getLocalStorage('user'))

export const initialState = user ? {
  isLoggedIn: true,
  user,
  isLoading: false,
  authNotification: null
} : {
  isLoggedIn: false,
  user: null,
  isLoading: false,
  authNotification: null
};

export default function authReducer(state = initialState, action) {
  const {
    type,
    payload
  } = action;

  switch (type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
          authNotification: {
            message: "User added successfully",
            type: 'success'
          }
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
          isLoading: false,
          authNotification: {
            message: payload.message,
            type: payload.status
          }
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
          isLoading: false,
          user: payload.user,
          authNotification: {
            type: 'success'
          }
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
          isLoggedIn: false,
          user: null,
          authNotification: {
            message: payload.message,
            type: payload.status
          }
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
          user: null,
      };
    case RESET_AUTH_NOTIFICATION:
      return {
        ...state,
        authNotification: null,
      };
    default:
      return state;
  }
}
