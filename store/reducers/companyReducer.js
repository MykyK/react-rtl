import {
  GET_COMPANIES_REQUEST,
  GET_COMPANIES_SUCCESS,
  GET_COMPANIES_FAIL,
  GET_COMPANY_REQUEST,
  GET_COMPANY_SUCCESS,
  GET_COMPANY_FAIL,
  UPDATE_COMPANY_REQUEST,
  UPDATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAIL,
  RESET_COMPANY_NOTIFICATION,
  DELETE_COMPANY_REQUEST,
  DELETE_COMPANY_SUCCESS,
  DELETE_COMPANY_FAIL,
} from "../actionTypes";

export const initialState = {
  companies: [],
  notification: null,
  contextCompany: null,
  company: null,
  isLoading: false
}

export default function userReducer(state = initialState, action) {
  const {
    type,
    payload
  } = action;

  switch (type) {
    case GET_COMPANIES_REQUEST:
    case GET_COMPANY_REQUEST:
    case UPDATE_COMPANY_REQUEST:
    case DELETE_COMPANY_REQUEST:
      return {
        ...state,
      };
    case GET_COMPANIES_SUCCESS:
      return {
        ...state,
        companies: payload.companies.data,
          isLoading: false,
      };
    case UPDATE_COMPANY_SUCCESS:
    case GET_COMPANIES_FAIL:
    case GET_COMPANY_FAIL:
    case UPDATE_COMPANY_FAIL:
    case DELETE_COMPANY_FAIL:
    case UPDATE_COMPANY_FAIL:
      return {
        ...state,
        notification: {
            message: payload.message,
            type: payload.status
          },
          isLoading: false
      };
    case GET_COMPANY_SUCCESS:
      return {
        ...state,
        company: payload.company.data,
          notification: {
            message: payload.message,
            type: payload.status
          },
          isLoading: false
      };
    case DELETE_COMPANY_SUCCESS:
      return {
        ...state,
        companies: [...state.companies].filter(company => {
            if (company.id !== payload.companyId) {
              return company
            }
          }),
          notification: {
            message: payload.response.message,
            type: payload.response.status
          },
      };
    case RESET_COMPANY_NOTIFICATION:
      return {
        ...state,
        notification: null,
      };
    default:
      return state;
  }
}
