import {
  RESET_COMPANY_NOTIFICATION,
}
from "../actionTypes";

import {
  getCombineActions
} from './../../utils/reduxActions';

export const initialState = {
  companies: null,
  companyNotification: null,
  contextCompany: null,
  company: null,
  isCompaniesLoading: true
}

export default function userReducer(state = initialState, action) {
  const {
    type,
    payload,
    ctx,
    name
  } = action;


  const initSuccessCompanyAction = (payload, name) => {
    if (payload.data && payload.message) {
      return {
        ...state,
        [name]: payload.data,
        isCompaniesLoading: false,
        companyNotification: {
          message: payload.message,
          type: payload.status
        },
      }
    } else if (!payload.data && payload.message) {
      return {
        ...state,
        isCompaniesLoading: false,
        companyNotification: {
          message: payload.message,
          type: payload.status
        },
      }
    } else if (payload.data && !payload.message) {
      return {
        ...state,
        [name]: payload.data,
        isCompaniesLoading: false,
      }
    } else {
      return {
        ...state,
        isCompaniesLoading: false,
      }
    }
  }

  const getUserReducerStructure = (actionTypes) => {
    switch (type) {
      case actionTypes.request:
        return {
          ...state,
          isCompaniesLoading: true
        };
      case actionTypes.success:
        return initSuccessCompanyAction(payload, name)
      case actionTypes.fail:
        return {
          ...state,
          isCompaniesLoading: false,
            companyNotification: {
              message: payload.message,
              type: payload.status
            },
        };
      case RESET_COMPANY_NOTIFICATION:
        return {
          ...state,
          companyNotification: null,
        };
      default:
        return {
          ...state
        }
    }
  }

  return getCombineActions(ctx, getUserReducerStructure)
}
