import companyReducer, {
  initialState as companyInitialState
} from '../companyReducer';
import * as constants from '../../actionTypes'

describe('companyReducer', () => {
  const reducerSign = 'COMPANY_'

  describe.each([
    ['payload.data && payload.message', {
        data: [],
        message: 'test',
        status: 'test'
      },
      {
        ...companyInitialState,
        companies: [],
        isCompaniesLoading: false,
        companyNotification: {
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
        ...companyInitialState,
        isCompaniesLoading: false,
        companyNotification: {
          message: 'test',
          type: 'test'
        },
      }
    ],
    ['payload.data && !payload.message', {
        data: [],
      },
      {
        ...companyInitialState,
        companies: [],
        isCompaniesLoading: false,
      }
    ],
    ['!payload.data && !payload.message', {}, {
      ...companyInitialState,
      isCompaniesLoading: false
    }]
  ])('When  %s', (condition, payload, state) => {
    it('should return the correct structure for ACTION_TYPE_SUCCESS', () => {
      const action = {
        type: reducerSign + 'ACTION_TYPE' + '_SUCCESS',
        ctx: 'ACTION_TYPE',
        payload,
        error: null,
        name: 'companies'
      };
      expect(companyReducer(companyInitialState, action)).toEqual(state)
    })
  })


  it('should return companyInitialState with no state passed in', () => {
    const action = {};
    expect(companyReducer(undefined, action)).toEqual(companyInitialState)
  })

  it('should return the correct structure for COMPANY_ACTION_TYPE_REQUEST', () => {
    const action = {
      type: reducerSign + 'ACTION_TYPE' + '_REQUEST',
      ctx: 'ACTION_TYPE',
      payload: null,
      error: null,
      name: 'companies'
    };
    expect(companyReducer(companyInitialState, action)).toEqual({
      ...companyInitialState,
      isCompaniesLoading: true
    })
  })

  it('should return the correct structure for COMPANY_ACTION_TYPE_FAIL', () => {
    const action = {
      type: reducerSign + 'ACTION_TYPE' + '_FAIL',
      ctx: 'ACTION_TYPE',
      payload: null,
      name: 'companies',
      error: {
        message: 'error',
        status: 'error'
      }
    };
    expect(companyReducer(companyInitialState, action)).toEqual({
      ...companyInitialState,
      isCompaniesLoading: false,
      companyNotification: {
        message: 'error',
        type: 'error'
      }
    })
  })

  it('should return the correct structure for RESET_COMPANY_NOTIFICATION', () => {
    const action = {
      type: constants.RESET_COMPANY_NOTIFICATION,
    };
    expect(companyReducer(companyInitialState, action)).toEqual({
      ...companyInitialState,
      companyNotification: null
    })
  })
})
