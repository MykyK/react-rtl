import {
  GET_COMPANIES,
  GET_COMPANY,
  UPDATE_COMPANY,
  DELETE_COMPANY,
  CREATE_COMPANY,
  RESET_COMPANY_NOTIFICATION,
} from "../actionTypes";

import CompanyService from "../../pages/api/companyApi";

import {
  actionPromise
} from "../../utils/reduxActions";


export const updateCompany = (data) => async (dispatch) => {
  await dispatch(actionPromise(CompanyService.updateCompany(data), 'updateCompany', UPDATE_COMPANY, 'COMPANY_'))
};


export const deleteCompanyAction = (companyId) => async (dispatch) => {
  await dispatch(actionPromise(CompanyService.deleteCompany(companyId), 'deleteCompany', DELETE_COMPANY, 'COMPANY_'))
};

export const createCompanyAction = (data) => async (dispatch) => {
  await dispatch(actionPromise(CompanyService.createCompany(data), 'createCompany', CREATE_COMPANY, 'COMPANY_'))
};

export const getCompaniesAction = (params) => async (dispatch) => {
  await dispatch(actionPromise(CompanyService.getCompanies(params), 'companies', GET_COMPANIES, 'COMPANY_'))
};

export const getCompanyAction = (companyId) => async (dispatch) => {
  await dispatch(actionPromise(CompanyService.getCompany(companyId), 'company', GET_COMPANY, 'COMPANY_'))
};


export const resetCompanyNotification = () => (dispatch) => {
  dispatch({
    type: RESET_COMPANY_NOTIFICATION
  });
};
