import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  mockUserStore,
  mockCompanyStore,
  mockAuthStore,
} from '../../../containers/Dashboard/__mocks__/index';
import {
  ADD_COMPANY_TO_USER,
  DELETE_USER,
  GET_USER,
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  UPDATE_USER_IN_COMPANY,
  DELETE_COMPANY_FROM_USER,
  SHOW_DIALOG,
  HIDE_DIALOG,
  GET_EXPANDED_STATUS,
  RESET_USER_NOTIFICATION,
} from '../../actionTypes';

import * as userActions from '../userActions';

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
    userActions.getUsers,
    'USER_GET_USER_SUCCESS',
    'USER_GET_USER_FAIL',
    'get',
    getExpectedActions({}, 'users', GET_USERS, 'USER_')
  ],
  [
    userActions.updateUser,
    "USER_UPDATE_USER_SUCCESS",
    "USER_UPDATE_USER_FAIL",
    'put',
    getExpectedActions({}, 'updatedUser', UPDATE_USER, 'USER_'),
    1,
  ],
  [
    userActions.updateUserInCompany,
    "USER_UPDATE_USER_IN_COMPANY_SUCCESS",
    "USER_UPDATE_USER_IN_COMPANY_FAIL",
    'put',
    getExpectedActions({}, 'updateUserInCompany', UPDATE_USER_IN_COMPANY, 'USER_'),
    1,
  ],
  [
    userActions.deleteCompanyFromUser,
    "USER_DELETE_COMPANY_FROM_USER_SUCCESS",
    "USER_DELETE_COMPANY_FROM_USER_FAIL",
    'delete',
    getExpectedActions({}, 'deleteCompanyFromUser', DELETE_COMPANY_FROM_USER, 'USER_'),
    {
      userId: 1,
      companyId: 1
    },
  ],
  [
    userActions.createUser,
    "USER_CREATE_USER_SUCCESS",
    "USER_CREATE_USER_FAIL",
    'post',
    getExpectedActions({}, 'createUser', CREATE_USER, 'USER_'),
  ],
  [
    userActions.deleteUser,
    "USER_DELETE_USER_SUCCESS",
    "USER_DELETE_USER_FAIL",
    'delete',
    getExpectedActions({}, 'deletedUser', DELETE_USER, 'USER_'),
  ],
  [
    userActions.getUser,
    "USER_GET_USER_SUCCESS",
    "USER_GET_USER_FAIL",
    'get',
    getExpectedActions({}, 'user', GET_USER, 'USER_'),
  ],
  [
    userActions.addCompanyToUserAction,
    "USER_ADD_COMPANY_TO_USER_SUCCESS",
    "USER_ADD_COMPANY_TO_USER_FAIL",
    'post',
    getExpectedActions({}, 'addCompanyToUser', ADD_COMPANY_TO_USER, 'USER_'),
  ]
]

describe('User actions', () => {
  let store;
  store = mockStore({
    user: mockUserStore,
    company: mockCompanyStore,
    auth: mockAuthStore
  });
  beforeEach(() => {
    mockAxios.get.mockClear()
    mockAxios.put.mockClear()
    mockAxios.post.mockClear()
    mockAxios.delete.mockClear()
    jest.clearAllMocks()
    store.clearActions();
  })

  it('should dispatch SHOW_DIALOG', () => {
    store.dispatch(userActions.openDialog(null, 'Add User'))
    expect(store.getActions()).toEqual([{
      type: SHOW_DIALOG,
      payload: {
        user: null,
        dialogType: 'Add User',
      }
    }])
  })

  it('should dispatch HIDE_DIALOG', () => {
    store.dispatch(userActions.closeDialog())
    expect(store.getActions()).toEqual([{
      type: HIDE_DIALOG,
    }])
  })

  it('should dispatch GET_EXPANDED_STATUS', () => {
    store.dispatch(userActions.getRowExpandedStatus(false))
    expect(store.getActions()).toEqual([{
      type: GET_EXPANDED_STATUS,
      payload: false
    }])
  })

  it('should dispatch RESET_USER_NOTIFICATION', () => {
    store.dispatch(userActions.resetUserNotification())
    expect(store.getActions()).toEqual([{
      type: RESET_USER_NOTIFICATION
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
