import React from 'react'
import { renderWithState } from '../../../utils/renderWithState'
import { useRouter } from 'next/router'
import Auth from './../Auth'
import { mockAuthStore } from '../../Dashboard/__mocks__'
import { cleanup } from '@testing-library/react'
import {
  mockCompanyStore,
  mockUserStore,
} from './../../Dashboard/__mocks__/index'

jest.mock('../../../utils/customHooks', () => ({
  ...jest.requireActual('../../../utils/customHooks'),
  useFieldValidation: () => [null, null, null, null],
}))

jest.mock('../../../store/actions/authActions.js', () => ({
  login: () => ({
    type: 'LOGIN_SUCCESS',
    payload: [{ email: 'test@test.com' }],
  }),
  register: () => ({
    type: 'REGISTER_SUCCESS',
    payload: [{ email: 'test@test.com' }],
  }),
  resetAuthNotification: () => ({
    type: 'RESET_COMPANY_NOTIFICATION',
  }),
}))

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('<Auth />', () => {
  let container

  describe('When default props are passed', () => {
    beforeEach(() => {
      container = renderWithState(<Auth />)
    })
    afterEach(() => {
      jest.clearAllMocks()
    })
    it('should render component', () => {
      expect(container.render.getByTestId('auth-component'))
    })
  })

  describe('When authNotification exist with success type', () => {
    const push = jest.fn()
    useRouter.mockImplementation(() => ({
      push,
      pathname: '/',
      route: '/',
      asPath: '/',
      query: '',
    }))
    const initialState = {
      auth: {
        ...mockAuthStore,
        authNotification: {
          message: 'test',
          type: 'success',
        },
      },
      company: mockCompanyStore,
      user: mockUserStore,
    }
    initialState.dispatch = jest.fn()
    beforeEach(() => {
      jest.useFakeTimers()
      container = renderWithState(<Auth />, { initialState })
    })
    afterEach(() => {
      cleanup()
      jest.clearAllMocks()
      jest.useRealTimers()
    })
    it('router should push to "/dashboard" after mount component', () => {
      jest.advanceTimersByTime(400)
      expect(push).toHaveBeenCalledTimes(1)
      expect(push).toHaveBeenCalledWith('/dashboard')
    })
    it('router should dispatch action after mount component"', () => {
      jest.advanceTimersByTime(500)
      expect(container.store.dispatch).toHaveBeenCalledTimes(1)
    })
  })
})
