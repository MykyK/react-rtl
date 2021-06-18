import authReducer, {
  initialState as authInitialState
} from '../authReducer';
import * as constants from '../../constants'


describe('authReducer', () => {
  it('should return authInitialState with no state passed in', () => {
    const action = {};
    expect(authReducer(undefined, action)).toEqual(authInitialState)
  })

  it('should return the correct structure for REGISTER_REQUEST', () => {
    const action = {
      type: constants.REGISTER_REQUEST
    };
    expect(authReducer(authInitialState, action)).toEqual({
      ...authInitialState,
      isLoading: true
    })
  })

  it('should return the correct structure for REGISTER_SUCCESS', () => {
    const action = {
      type: constants.REGISTER_SUCCESS
    };
    expect(authReducer(authInitialState, action)).toEqual({
      ...authInitialState,
      isLoading: false
    })
  })

  it('should return the correct structure for REGISTER_FAIL', () => {
    const action = {
      type: constants.REGISTER_FAIL
    };
    expect(authReducer(authInitialState, action)).toEqual({
      ...authInitialState,
      isLoading: false,
      isLoggedIn: false
    })
  })

  it('should return the correct structure for LOGIN_REQUEST', () => {
    const action = {
      type: constants.LOGIN_REQUEST
    };
    expect(authReducer(authInitialState, action)).toEqual({
      ...authInitialState,
      isLoading: true
    })
  })

  it('should return the correct structure for LOGIN_SUCCESS', () => {
    const user = {}
    const action = {
      type: constants.LOGIN_SUCCESS,
      payload: {
        user
      }
    };
    expect(authReducer(authInitialState, action)).toEqual({
      ...authInitialState,
      isLoggedIn: true,
      isLoading: false,
      user: user
    })
  })

  it('should return the correct structure for LOGIN_FAIL', () => {
    const action = {
      type: constants.LOGIN_FAIL
    };
    expect(authReducer(authInitialState, action)).toEqual({
      ...authInitialState,
      isLoggedIn: false,
      isLoading: false,
      user: null
    })
  })

  it('should return the correct structure for LOGOUT', () => {
    const action = {
      type: constants.LOGOUT
    };
    expect(authReducer(authInitialState, action)).toEqual({
      ...authInitialState,
      isLoggedIn: false,
      user: null
    })
  })
})
