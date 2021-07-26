import {
  UPDATE_COMPANY_REQUEST,
  UPDATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAIL,
} from "../actionTypes";

export const initialState = {
  companies: [],
  contextCompany: null,
}

export default function userReducer(state = initialState, action) {
  const {
    type,
    payload
  } = action;

  switch (type) {
    case UPDATE_COMPANY_REQUEST:
    case UPDATE_COMPANY_SUCCESS:
    case UPDATE_COMPANY_FAIL:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
}
