import {
  RESET_AUTH_NOTIFICATION,
} from "../actionTypes";

import {
  getCombineActions
} from './../../utils/reduxActions';

export const getLocalStorage = (item) => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(item);
  }
  return null;
}

const user = JSON.parse(getLocalStorage('user'))

export const initialState = user ? {
  isLoggedIn: true,
  user: user.data,
  isLoading: false,
  authNotification: null
} : {
  isLoggedIn: false,
  user: null,
  isLoading: true,
  authNotification: null
};

export default function authReducer(state = initialState, action) {
  const {
    type,
    payload,
    error,
    ctx,
    name
  } = action;



  const getAuthReducerStructure = (actionTypes) => {
    switch (type) {
      case actionTypes.request:
        return {
          ...state,
          isLoading: true
        };
      case actionTypes.success:
        return {
          ...state,
          [name]: payload.data,
            isLoading: false,
            isLoggedIn: true,
            authNotification: {
              message: payload.message,
              type: payload.status
            },
        }
        case actionTypes.fail:
          return {
            ...state,
            isLoading: false,
              isLoggedIn: false,
              authNotification: {
                message: error.message,
                type: error.status
              },
          };
        case RESET_AUTH_NOTIFICATION:
          return {
            ...state,
            authNotification: null,
          };
        default:
          return {
            ...state
          }
    }
  }

  return getCombineActions(ctx, 'AUTH_', getAuthReducerStructure)

}
