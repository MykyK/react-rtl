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
  DELETE_COMPANY_REQUEST,
  DELETE_COMPANY_SUCCESS,
  DELETE_COMPANY_FAIL,
  CREATE_COMPANY_REQUEST,
  CREATE_COMPANY_SUCCESS,
  CREATE_COMPANY_FAIL,
  RESET_COMPANY_NOTIFICATION,
} from "../actionTypes";

import CompanyService from "../../pages/api/companyApi";



export const updateCompany = (data) => async (dispatch) => {
  try {
    const response = await CompanyService.updateCompany(data)
    dispatch({
      type: UPDATE_COMPANY_REQUEST
    })
    dispatch({
      type: UPDATE_COMPANY_SUCCESS,
      payload: response
    })

  } catch (error) {
    dispatch({
      type: UPDATE_COMPANY_FAIL,
      payload: error
    })
    return console.error(error);
  }
};

export const deleteCompanyAction = (companyId) => async (dispatch) => {
  try {
    const response = await CompanyService.deleteCompany(companyId)
    dispatch({
      type: DELETE_COMPANY_REQUEST
    })
    dispatch({
      type: DELETE_COMPANY_SUCCESS,
      payload: {
        companyId,
        response
      }
    })
  } catch (error) {
    dispatch({
      type: DELETE_COMPANY_FAIL,
      payload: error
    })
  }
};

export const createCompanyAction = (data) => async (dispatch) => {
  try {
    await CompanyService.createCompany(data)
    dispatch({
      type: CREATE_COMPANY_REQUEST
    })
    dispatch({
      type: CREATE_COMPANY_SUCCESS
    })

  } catch (error) {
    dispatch({
      type: CREATE_COMPANY_FAIL
    })
    return console.error(error);
  }
};

export const getCompaniesAction = () => async (dispatch) => {
  try {
    const companies = await CompanyService.getCompanies()
    dispatch({
      type: GET_COMPANIES_REQUEST
    })
    dispatch({
      type: GET_COMPANIES_SUCCESS,
      payload: {
        companies
      }
    })

  } catch (error) {
    dispatch({
      type: GET_COMPANIES_FAIL,
      payload: {
        error
      }
    })
    return console.error(error);
  }
};

export const getCompanyAction = (companyId) => async (dispatch) => {
  try {
    const company = await CompanyService.getCompany(companyId)
    dispatch({
      type: GET_COMPANY_REQUEST
    })
    dispatch({
      type: GET_COMPANY_SUCCESS,
      payload: {
        company
      }
    })

  } catch (error) {
    dispatch({
      type: GET_COMPANY_FAIL,
      payload: {
        error
      }
    })
    return console.error(error);
  }
};


export const resetCompanyNotification = () => (dispatch) => {
  dispatch({
    type: RESET_COMPANY_NOTIFICATION
  });
};
