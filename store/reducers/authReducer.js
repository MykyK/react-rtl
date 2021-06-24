import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  LOGIN_FAIL,
  LOGOUT,
  RESET_AUTH_NOTIFICATION,
} from "../constants";

export const getLocalStorage = (item) => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(item);
  }
  return null;
}

const user = getLocalStorage('user')

export const initialState = user ? {
  isLoggedIn: true,
  user,
  isLoading: false,
  status: null
} : {
  isLoggedIn: false,
  user: null,
  isLoading: false,
  status: null
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
          status: {
            message: "User added successfully",
            type: 'success'
          }
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
          isLoading: false,
          status: {
            message: payload.message,
            type: 'error'
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
          status: {
            type: 'success'
          }
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
          isLoggedIn: false,
          user: null,
          status: {
            message: payload.message,
            type: 'error'
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
        status: null,
      };
    default:
      return state;
  }
}
