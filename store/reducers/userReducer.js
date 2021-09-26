import {
  RESET_USER_NOTIFICATION,
  SHOW_DIALOG,
  HIDE_DIALOG,
  GET_EXPANDED_STATUS,
} from "../actionTypes";

import {
  getCombineActions
} from './../../utils/reduxActions';

export const initialState = {
  users: null,
  isExpanded: false,
  user: null,
  dialogContext: null,
  dialogType: '',
  isDialogOpen: false,
  isUsersLoading: true,
  userNotification: null
}


export default function userReducer(state = initialState, action) {
  const {
    type,
    payload,
    ctx,
    name,
    error
  } = action;


  const initSuccessUserAction = (payload, name) => {
    if (payload.data && payload.message) {
      return {
        ...state,
        [name]: payload.data,
        isUsersLoading: false,
        userNotification: {
          message: payload.message,
          type: payload.status
        },
      }
    } else if (!payload.data && payload.message) {
      return {
        ...state,
        isUsersLoading: false,
        userNotification: {
          message: payload.message,
          type: payload.status
        },
      }
    } else if (payload.data && !payload.message) {
      return {
        ...state,
        [name]: payload.data,
        isUsersLoading: false,
      }
    } else {
      return {
        ...state,
        isUsersLoading: false,
      }
    }
  }

  const getUserReducerStructure = (actionTypes) => {
    switch (type) {
      case actionTypes.request:
        return {
          ...state,
          isUsersLoading: true
        };
      case actionTypes.success:
        return initSuccessUserAction(payload, name)
      case actionTypes.fail:
        return {
          ...state,
          isUsersLoading: false,
            userNotification: {
              message: error.message,
              type: error.status
            },
        };
      case RESET_USER_NOTIFICATION:
        return {
          ...state,
          userNotification: null,
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
      case GET_EXPANDED_STATUS:
        return {
          ...state,
          isExpanded: payload.isExpanded
        };
      default:
        return {
          ...state
        }
    }
  }
  return getCombineActions(ctx, 'USER_',
    getUserReducerStructure)
}
