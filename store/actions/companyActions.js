import {
  UPDATE_COMPANY_REQUEST,
  UPDATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAIL,
} from "../actionTypes";

import CompanyService from "../../pages/api/companyApi";



export const updateCompany = (data) => async (dispatch) => {
  console.log(data)
  try {
    await CompanyService.updateCompany(data)
    dispatch({
      type: UPDATE_COMPANY_REQUEST
    })
    dispatch({
      type: UPDATE_COMPANY_SUCCESS
    })

  } catch (error) {
    dispatch({
      type: UPDATE_COMPANY_FAIL
    })
    return console.error(error);
  }
};
