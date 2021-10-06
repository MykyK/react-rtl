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
  dispatch(actionPromise(await CompanyService.updateCompany(data), 'updateCompany', UPDATE_COMPANY, 'COMPANY_'))
};


export const deleteCompanyAction = (companyId) => async (dispatch) => {
  dispatch(actionPromise(await CompanyService.deleteCompany(companyId), 'deleteCompany', DELETE_COMPANY, 'COMPANY_'))
};

export const createCompanyAction = (data) => async (dispatch) => {
  dispatch(actionPromise(await CompanyService.createCompany(data), 'createCompany', CREATE_COMPANY, 'COMPANY_'))
};

export const getCompaniesAction = (params) => async (dispatch) => {
  dispatch(actionPromise(await CompanyService.getCompanies(params), 'companies', GET_COMPANIES, 'COMPANY_'))
};

export const getCompanyAction = (companyId) => async (dispatch) => {
  dispatch(actionPromise(await CompanyService.getCompany(companyId), 'company', GET_COMPANY, 'COMPANY_'))
};


export const resetCompanyNotification = () => (dispatch) => {
  dispatch({
    type: RESET_COMPANY_NOTIFICATION
  });
};
