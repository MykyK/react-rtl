import React from 'react'
import { cleanup } from '@testing-library/react'
import { renderWithState } from '../../../utils/renderWithState'
import DashboardDialogContainer from '../DashboardDialogContainer'
import {
  useSetForm as mockUseSetForm,
  useFieldValidation as mockUseFieldValidation,
  useDialogContext as mockUseDialogContext,
} from './../../../utils/customHooks'
import {
  mockUserStore,
  mockCompanyStore,
} from './../../Dashboard/__mocks__/index'

jest.mock('../../../utils/customHooks', () => ({
  ...jest.requireActual('../../../utils/customHooks'),
  useFieldValidation: jest.fn(),
  useDialogContext: jest.fn(),
  useSetForm: jest.fn(),
}))

jest.mock('../../../store/actions/userActions.js', () => ({
  getUsers: () => ({
    type: 'GET_USERS_SUCCESS',
    payload: [{ username: 'test' }],
  }),
  closeDialog: () => ({ type: 'HIDE_DIALOG' }),
  openDialog: () => ({ type: 'SHOW_DIALOG' }),
  updateUser: () => ({ type: 'UPDATE_USER_SUCCESS' }),
}))

jest.mock('../../../store/actions/authActions.js', () => ({
  register: () => ({ type: 'REGISTER_SUCCESS' }),
  resetAuthNotification: () => ({ type: 'RESET_AUTH_NOTIFICATION' }),
}))

describe('<DashboardDialogContainer/>', () => {
  let container
  const resetForm = jest.fn()
  const setFormValue = jest.fn()
  const setNewForm = jest.fn()
  mockUseSetForm.mockImplementation(() => ({
    form: {
      username: 'test12345',
      email: 'test@teset.com',
      password: 'testtest123',
    },
    resetForm,
    setFormValue,
    setNewForm,
  }))
  mockUseFieldValidation.mockImplementation(() => [null, null, null])
  mockUseDialogContext.mockImplementation(() => ({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    password: '',
  }))

  beforeEach(() => {
    container = renderWithState(<DashboardDialogContainer />)
  })

  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })

  it('should render component', () => {
    expect(container.render.getByTestId('dialog-wrapper')).toBeInTheDocument()
  })
  const initialContext = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    password: '',
  }
  describe('When dialogType and initialContext props exist', () => {
    const initialState = {
      user: {
        ...mockUserStore,
        dialogContext: initialContext,
        dialogType: 'Add company to user',
      },
      company: {
        ...mockCompanyStore,
        companies: { items: [{ name: 'test' }] },
        totalItems: 1,
      },
    }
    initialState.dispatch = jest.fn()
    beforeEach(() => {
      container = renderWithState(<DashboardDialogContainer />, {
        initialState,
      })
    })

    afterEach(() => {
      jest.clearAllMocks()
      cleanup()
    })
    it('should dispatch action ', () => {
      const container = renderWithState(<DashboardDialogContainer />, {
        initialState,
      })

      expect(container.store.dispatch).toHaveBeenCalledTimes(1)
    })
    it('should call setNewForm ', () => {
      expect(setNewForm).toHaveBeenCalledWith(initialContext)
    })
  })
  describe('When dialogType prop exist and initialContext is equal null', () => {
    const initialState = {
      user: {
        ...mockUserStore,
        dialogContext: initialContext,
        dialogType: null,
      },
      company: mockCompanyStore,
    }
    initialState.dispatch = jest.fn()
    beforeEach(() => {
      mockUseFieldValidation.mockImplementationOnce(() => [null, null, null])
      mockUseDialogContext.mockImplementationOnce(() => null)
      mockUseSetForm.mockImplementationOnce(() => ({
        form: {
          username: 'test12345',
          email: 'test@teset.com',
          password: 'testtest123',
        },
        resetForm,
        setFormValue,
        setNewForm,
      }))
      container = renderWithState(<DashboardDialogContainer />, {
        initialState,
      })
    })

    afterEach(() => {
      jest.clearAllMocks()
      cleanup()
    })

    it('should call setNewForm ', () => {
      expect(setNewForm).toHaveBeenCalledWith({
        username: 'test12345',
        email: 'test@teset.com',
        password: 'testtest123',
      })
    })
  })
})
