import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  mockUserStore,
  mockCompanyStore,
  mockAuthStore,
} from '../../../containers/Dashboard/__mocks__/index';
import {
  GET_COMPANIES,
  GET_COMPANY,
  UPDATE_COMPANY,
  DELETE_COMPANY,
  CREATE_COMPANY,
  RESET_COMPANY_NOTIFICATION,
} from '../../actionTypes';

import * as companyActions from '../companyActions';

import axios from "axios";




jest.mock("axios");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockAxios = axios

const getExpectedActions = (payload, name, ctx, reducer) => {
  return [{
      ctx,
      error: null,
      name,
      payload: null,
      type: reducer + ctx + '_REQUEST'
    }, {
      ctx,
      error: null,
      name,
      payload,
      type: reducer + ctx + '_SUCCESS'
    },
    {
      ctx,
      error: {
        status: 'error',
        message: 'Some network error'
      },
      name,
      payload: null,
      type: reducer + ctx + '_FAIL'
    }
  ]
}


const userPromiseActions = [
  [
    companyActions.updateCompany,
    'COMPANY_UPDATE_COMPANY_SUCCESS',
    'COMPANY_UPDATE_COMPANY_FAIL',
    'put',
    getExpectedActions({}, 'updateCompany', UPDATE_COMPANY, 'COMPANY_'),
    {}
  ],
  [
    companyActions.deleteCompanyAction,
    "COMPANY_DELETE_COMPANY_SUCCESS",
    "COMPANY_DELETE_COMPANY_FAIL",
    'delete',
    getExpectedActions({}, 'deleteCompany', DELETE_COMPANY, 'COMPANY_'),
    1,
  ],
  [
    companyActions.createCompanyAction,
    "COMPANY_CREATE_COMPANY_SUCCESS",
    "COMPANY_CREATE_COMPANY_FAIL",
    'post',
    getExpectedActions({}, 'createCompany', CREATE_COMPANY, 'COMPANY_'),
    {},
  ],
  [
    companyActions.getCompaniesAction,
    "COMPANY_GET_COMPANIES_SUCCESS",
    "COMPANY_GET_COMPANIES_FAIL",
    'get',
    getExpectedActions({}, 'companies', GET_COMPANIES, 'COMPANY_'),
    {},
  ],
  [
    companyActions.getCompanyAction,
    "COMPANY_GET_COMPANY_SUCCESS",
    "COMPANY_GET_COMPANY_FAIL",
    'get',
    getExpectedActions({}, 'company', GET_COMPANY, 'COMPANY_'),
    1
  ]
]

describe('Company actions', () => {
  let store;
  store = mockStore({
    user: mockUserStore,
    company: mockCompanyStore,
    auth: mockAuthStore
  });
  beforeEach(() => {
    mockAxios.post.mockClear()
    jest.clearAllMocks()
    store.clearActions();
  })

  it('should dispatch RESET_COMPANY_NOTIFICATION', () => {
    store.dispatch(companyActions.resetCompanyNotification())
    expect(store.getActions()).toEqual([{
      type: RESET_COMPANY_NOTIFICATION
    }])
  })

  describe.each(userPromiseActions)('Promise actions', (action, successAction, failAction, axiosMethod, expectedActions, callArgs) => {

    it(`should dispatch ${successAction} after successfully API requests`, async () => {
      const response = {
        data: {}
      }
      mockAxios[axiosMethod].mockResolvedValue(response);
      await store.dispatch(action(callArgs))
      expect(store.getActions()).toEqual([expectedActions[0], expectedActions[1]])
    })
    it(`should dispatch ${failAction} after failed API requests`, () => {
      const networkError = new Error('Some network error')
      mockAxios[axiosMethod].mockRejectedValue(networkError);
      store.dispatch(action(callArgs)).then(() => {
        expect(store.getActions()).toEqual([expectedActions[0], expectedActions[2]])
      })
    })
  })
})
