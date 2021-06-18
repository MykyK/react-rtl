import userReducer, {
  initialState as userInitialState
} from '../userReducer';
import * as constants from '../../constants'

describe('authReducer', () => {
  it('should return authInitialState with no state passed in', () => {
    const action = {};
    expect(userReducer(undefined, action)).toEqual(userInitialState)
  })

  it('should return the correct structure for GET_USERS_REQUEST', () => {
    const action = {
      type: constants.GET_USERS_REQUEST
    };
    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      isLoading: true
    })
  })

  it('should return the correct structure for GET_USERS_SUCCESS', () => {
    const users = {
      data: []
    }
    const action = {
      type: constants.GET_USERS_SUCCESS,
      payload: {
        users
      }
    };
    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      isLoading: false,
      users: users.data
    })
  })

  it('should return the correct structure for GET_USERS_FAIL', () => {
    const action = {
      type: constants.GET_USERS_FAIL,
    };
    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      isLoading: false,
    })
  })

  it('should return the correct structure for DELETE_USER_REQUEST', () => {
    const action = {
      type: constants.DELETE_USER_REQUEST,
    };
    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      isLoading: true,
    })
  })

  it('should return the correct structure for DELETE_USER_SUCCESS', () => {
    const state = {
      ...userInitialState,
      users: [{
        id: 1
      }, {
        id: 2
      }]
    }
    const action = {
      type: constants.DELETE_USER_SUCCESS,
      payload: {
        userId: 1
      }
    };
    expect(userReducer(state, action)).toEqual({
      ...state,
      users: [{
        id: 2
      }],
      isLoading: false,
    })
  })

  it('should return the correct structure for DELETE_USER_FAIL', () => {
    const action = {
      type: constants.DELETE_USER_FAIL,
    };
    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      isLoading: false,
      users: null
    })
  })

  it('should return the correct structure for SHOW_DIALOG with payload', () => {
    const user = {}
    const action = {
      type: constants.SHOW_DIALOG,
      payload: {
        user
      }
    };
    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      isDialogOpen: true,
      contextUser: user
    })
  })

  it('should return the correct structure for SHOW_DIALOG without payload', () => {
    const action = {
      type: constants.SHOW_DIALOG,
    };
    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      isDialogOpen: true,
      contextUser: null
    })
  })

  it('should return the correct structure for HIDE_DIALOG', () => {
    const action = {
      type: constants.HIDE_DIALOG,
    };
    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      isDialogOpen: false,
    })
  })
})
