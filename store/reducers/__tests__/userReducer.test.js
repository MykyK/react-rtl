import userReducer, {
  initialState as userInitialState
} from '../userReducer';
import * as constants from '../../actionTypes'

describe('userReducer', () => {
  const reducerSign = 'USER_'

  describe.each([
    ['payload.data && payload.message', {
        data: [],
        message: 'test',
        status: 'test'
      },
      {
        ...userInitialState,
        users: [],
        isUsersLoading: false,
        userNotification: {
          message: 'test',
          type: 'test'
        }
      }
    ],
    ['!payload.data && payload.message', {
        message: 'test',
        status: 'test'
      },
      {
        ...userInitialState,
        isUsersLoading: false,
        userNotification: {
          message: 'test',
          type: 'test'
        },
      }
    ],
    ['payload.data && !payload.message', {
        data: [],
      },
      {
        ...userInitialState,
        users: [],
        isUsersLoading: false,
      }
    ],
    ['!payload.data && !payload.message', {}, {
      ...userInitialState,
      isUsersLoading: false
    }]
  ])('When  %s', (condition, payload, state) => {
    it('should return the correct structure for ACTION_TYPE_SUCCESS', () => {
      const action = {
        type: reducerSign + 'ACTION_TYPE' + '_SUCCESS',
        ctx: 'ACTION_TYPE',
        payload,
        error: null,
        name: 'users'
      };
      expect(userReducer(userInitialState, action)).toEqual(state)
    })
  })


  it('should return userInitialState with no state passed in', () => {
    const action = {};
    expect(userReducer(undefined, action)).toEqual(userInitialState)
  })

  it('should return the correct structure for USER_ACTION_TYPE_REQUEST', () => {
    const action = {
      type: reducerSign + 'ACTION_TYPE' + '_REQUEST',
      ctx: 'ACTION_TYPE',
      payload: null,
      error: null,
      name: 'users'
    };
    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      isUsersLoading: true
    })
  })

  it('should return the correct structure for USER_ACTION_TYPE_FAIL', () => {
    const action = {
      type: reducerSign + 'ACTION_TYPE' + '_FAIL',
      ctx: 'ACTION_TYPE',
      payload: null,
      name: 'users',
      error: {
        message: 'error',
        status: 'error'
      }
    };
    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      isUsersLoading: false,
      userNotification: {
        message: 'error',
        type: 'error'
      }
    })
  })

  it('should return the correct structure for SHOW_DIALOG with payload', () => {
    const action = {
      type: constants.SHOW_DIALOG,
      payload: {
        dialogType: 'Add User',
        user: {}
      },

    };
    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      isDialogOpen: true,
      dialogType: 'Add User',
      dialogContext: {}
    })
  })

  it('should return the correct structure for SHOW_DIALOG without dialogContext', () => {
    const action = {
      type: constants.SHOW_DIALOG,
      payload: {
        dialogType: 'Add User',
        user: null
      }
    };
    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      isDialogOpen: true,
      dialogContext: null,
      dialogType: 'Add User'
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

  it('should return the correct structure for GET_EXPANDED_STATUS', () => {
    const action = {
      type: constants.GET_EXPANDED_STATUS,
      payload: {
        isExpanded: false
      }
    };
    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      isExpanded: false
    })
  })
  it('should return the correct structure for RESET_USER_NOTIFICATION', () => {
    const action = {
      type: constants.RESET_USER_NOTIFICATION,
    };
    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      userNotification: null
    })
  })
})
