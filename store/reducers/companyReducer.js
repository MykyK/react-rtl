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
  CREATE_COMPANY_REQUEST,
  CREATE_COMPANY_SUCCESS,
  CREATE_COMPANY_FAIL
}
from "../actionTypes";

export const initialState = {
  companies: null,
  notification: null,
  contextCompany: null,
  company: null,
  isLoading: true
}

export default function userReducer(state = initialState, action) {
  const {
    type,
    payload
  } = action;

  switch (type) {
    case GET_COMPANIES_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GET_COMPANY_REQUEST:
    case CREATE_COMPANY_REQUEST:
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
    case DELETE_COMPANY_SUCCESS:
    case CREATE_COMPANY_SUCCESS:
    case CREATE_COMPANY_FAIL:
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
    case RESET_COMPANY_NOTIFICATION:
      return {
        ...state,
        notification: null,
      };
    default:
      return state;
  }
}
