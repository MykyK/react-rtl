import authReducer, {
  initialState as authInitialState
} from '../authReducer';
import * as constants from '../../actionTypes'

describe('authReducer', () => {
  const reducerSign = 'AUTH_'

  it('should return authInitialState with no state passed in', () => {
    const action = {};
    expect(authReducer(undefined, action)).toEqual(authInitialState)
  })


  it('should return the correct structure for ACTION_TYPE_SUCCESS', () => {
    const action = {
      type: reducerSign + 'ACTION_TYPE' + '_SUCCESS',
      ctx: 'ACTION_TYPE',
      payload: {
        data: {},
        message: 'test',
        status: 'test'
      },
      error: null,
      name: 'user'
    };
    expect(authReducer(authInitialState, action)).toEqual({
      ...authInitialState,
      user: {},
      isLoading: false,
      isLoggedIn: true,
      authNotification: {
        message: 'test',
        type: 'test'
      }
    })
  })

  it('should return the correct structure for AUTH_ACTION_TYPE_REQUEST', () => {
    const action = {
      type: reducerSign + 'ACTION_TYPE' + '_REQUEST',
      ctx: 'ACTION_TYPE',
      payload: null,
      error: null,
      name: 'user'
    };
    expect(authReducer(authInitialState, action)).toEqual({
      ...authInitialState,
      isLoading: true
    })
  })

  it('should return the correct structure for AUTH_ACTION_TYPE_FAIL', () => {
    const action = {
      type: reducerSign + 'ACTION_TYPE' + '_FAIL',
      ctx: 'ACTION_TYPE',
      payload: null,
      name: 'user',
      error: {
        message: 'error',
        status: 'error'
      }
    };
    expect(authReducer(authInitialState, action)).toEqual({
      ...authInitialState,
      isLoading: false,
      isLoggedIn: false,
      authNotification: {
        message: 'error',
        type: 'error'
      }
    })
  })

  it('should return the correct structure for RESET_AUTH_NOTIFICATION', () => {
    const action = {
      type: constants.RESET_AUTH_NOTIFICATION,
    };
    expect(authReducer(authInitialState, action)).toEqual({
      ...authInitialState,
      authNotification: null
    })
  })
})
