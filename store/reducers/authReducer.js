import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  LOGIN_FAIL,
  LOGOUT,
} from "../constants";

const getLocalStorage = (item) => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(item);
  }
  return null;
}

const user = getLocalStorage('user')

export const initialState = user ? {
  isLoggedIn: true,
  user,
  isLoading: false
} : {
  isLoggedIn: false,
  user: null,
  isLoading: false
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
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
          isLoading: false,
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
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
          isLoggedIn: false,
          user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
          user: null,
      };
    default:
      return state;
  }
}
