import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  mockUserStore,
  mockCompanyStore,
  mockAuthStore,
} from '../../../containers/Dashboard/__mocks__/index';
import {
  REGISTER,
  LOGIN,
  LOGOUT,
  RESET_AUTH_NOTIFICATION,
} from '../../actionTypes';

import * as authActions from '../authActions';

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
    authActions.register,
    'AUTH_REGISTER_SUCCESS',
    'AUTH_REGISTER_FAIL',
    'post',
    getExpectedActions({}, 'register', REGISTER, 'AUTH_')
  ],
  [
    authActions.login,
    "AUTH_LOGIN_SUCCESS",
    "AUTH_LOGIN_FAIL",
    'post',
    getExpectedActions({}, 'user', LOGIN, 'AUTH_'),
    {},
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
    mockAxios.post.mockClear()
    jest.clearAllMocks()
    store.clearActions();
  })

  it('should dispatch SHOW_DIALOG', () => {
    store.dispatch(authActions.logout())
    expect(store.getActions()).toEqual([{
      type: LOGOUT,
    }])
  })

  it('should dispatch RESET_AUTH_NOTIFICATION', () => {
    store.dispatch(authActions.resetAuthNotification())
    expect(store.getActions()).toEqual([{
      type: RESET_AUTH_NOTIFICATION
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
