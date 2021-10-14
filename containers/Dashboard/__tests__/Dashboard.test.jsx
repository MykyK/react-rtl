import React from 'react'
import { cleanup } from '@testing-library/react'
import Dashboard from './../Dashboard'
import { renderWithState } from '../../../utils/renderWithState'
import { mockCompanyStore, mockUserStore } from './../__mocks__/index'
import { useRouter } from 'next/router'

jest.mock('../../../store/actions/userActions.js', () => ({
  getUsers: () => ({
    type: 'GET_USERS_SUCCESS',
    payload: [{ emailAddress: 'test@test.com' }],
  }),
  getUser: () => ({
    type: 'GET_USER_SUCCESS',
    payload: [{ emailAddress: 'test@test.com' }],
  }),
  closeDialog: () => ({
    type: 'HIDE_DIALOG',
  }),
  resetUserNotification: () => ({
    type: 'RESET_USER_NOTIFICATION',
  }),
}))

jest.mock('../../../store/actions/companyActions.js', () => ({
  getCompaniesAction: () => ({
    type: 'GET_COMPANIES_SUCCESS',
    payload: [{ email: 'test@test.com' }],
  }),
  resetCompanyNotification: () => ({
    type: 'RESET_COMPANY_NOTIFICATION',
  }),
}))

jest.mock('next/router')

const mockRouter = useRouter

describe('<Dashboard/>', () => {
  let container
  const initialState = {
    user: mockUserStore,
    company: mockCompanyStore,
  }
  mockRouter.mockImplementation(() => ({
    asPath: '/dashboard',
  }))
  describe('when the default props are passed', () => {
    initialState.dispatch = jest.fn()

    beforeEach(() => {
      mockRouter.mockImplementationOnce(() => ({
        asPath: '/dashboard',
      }))
      container = renderWithState(<Dashboard />, { initialState })
    })

    afterEach(() => {
      cleanup()
      jest.clearAllMocks()
    })

    it('should render element with data-testid "dashboard-container"', () => {
      const dashboardContainer = container.render.getByTestId(
        'dashboard-container'
      )
      expect(dashboardContainer).toBeInTheDocument()
    })

    it('should render element with data-testid "user-dashboard-content"', () => {
      const userDashboardContainer = container.render.getByTestId(
        'user-dashboard-content'
      )
      expect(userDashboardContainer).toBeInTheDocument()
    })

    it('should not render element with data-testid "company-dashboard-content"', () => {
      expect(() =>
        container.render.getByTestId('company-dashboard-content')
      ).toThrow('Unable to find an element')
    })

    it('should not render element with data-testid "error-notification"', () => {
      expect(() => container.render.getByTestId('error-notification')).toThrow(
        'Unable to find an element'
      )
    })
  })

  describe('when router path is "dashboard/companies"', () => {
    beforeEach(() => {
      mockRouter.mockImplementationOnce(() => ({
        asPath: '/dashboard/companies',
      }))
      container = renderWithState(<Dashboard />, { initialState })
    })

    afterEach(() => {
      cleanup()
    })

    initialState.dispatch = jest.fn()

    it('should render element with data-testid "company-dashboard-content"', () => {
      const userDashboardContainer = container.render.getByTestId(
        'company-dashboard-content'
      )
      expect(userDashboardContainer).toBeInTheDocument()
    })

    it('should not render element with data-testid "user-dashboard-content"', () => {
      expect(() =>
        container.render.getByTestId('user-dashboard-content')
      ).toThrow('Unable to find an element')
    })
  })
  describe('when userNotification exists  with success type and user exists', () => {
    const initialState = {
      user: {
        ...mockUserStore,
        users: { items: [] },
        user: { id: 2 },
        userNotification: { message: 'test', type: 'success' },
      },
      company: mockCompanyStore,
    }

    initialState.dispatch = jest.fn()
    beforeEach(() => {
      container = renderWithState(<Dashboard />, { initialState })
      jest.useFakeTimers()
    })

    afterEach(() => {
      cleanup()
      jest.useRealTimers()
    })

    it('should render <ErrorNotification/> component', () => {
      const errorNotification =
        container.render.getByTestId('error-notification')
      expect(errorNotification).toBeInTheDocument()
    })

    it('should dispatch actions', () => {
      const container = renderWithState(<Dashboard />, { initialState })
      jest.advanceTimersByTime(400)
      expect(container.store.dispatch).toHaveBeenCalledTimes(5)
      expect(container.store.dispatch).toHaveBeenCalledWith({
        type: 'GET_USERS_SUCCESS',
        payload: [{ emailAddress: 'test@test.com' }],
      })
      expect(container.store.dispatch).toHaveBeenCalledWith({
        type: 'GET_USERS_SUCCESS',
        payload: [{ emailAddress: 'test@test.com' }],
      })
      expect(container.store.dispatch).toHaveBeenCalledWith({
        type: 'GET_USER_SUCCESS',
        payload: [{ emailAddress: 'test@test.com' }],
      })
      expect(container.store.dispatch).toHaveBeenCalledWith({
        type: 'HIDE_DIALOG',
      })
      expect(container.store.dispatch).toHaveBeenCalledWith({
        type: 'RESET_USER_NOTIFICATION',
      })
    })
  })
  describe('when companyNotification exists  with success type', () => {
    const initialState = {
      user: mockUserStore,
      company: {
        ...mockCompanyStore,
        companyNotification: { message: 'test', type: 'success' },
      },
    }
    initialState.dispatch = jest.fn()

    beforeEach(() => {
      container = renderWithState(<Dashboard />, { initialState })
      jest.useFakeTimers()
    })

    afterEach(() => {
      cleanup()
      jest.useRealTimers()
    })

    it('should render <ErrorNotification/> component', () => {
      const errorNotification =
        container.render.getByTestId('error-notification')
      expect(errorNotification).toBeInTheDocument()
    })

    it('should dispatch actions', () => {
      const container = renderWithState(<Dashboard />, { initialState })
      jest.advanceTimersByTime(400)

      expect(container.store.dispatch).toHaveBeenCalledTimes(5)
      expect(container.store.dispatch).toHaveBeenCalledWith({
        type: 'GET_USERS_SUCCESS',
        payload: [{ emailAddress: 'test@test.com' }],
      })
      expect(container.store.dispatch).toHaveBeenCalledWith({
        type: 'GET_COMPANIES_SUCCESS',
        payload: [{ email: 'test@test.com' }],
      })
      expect(container.store.dispatch).toHaveBeenCalledWith({
        type: 'GET_COMPANIES_SUCCESS',
        payload: [{ email: 'test@test.com' }],
      })

      expect(container.store.dispatch).toHaveBeenCalledWith({
        type: 'HIDE_DIALOG',
      })
      expect(container.store.dispatch).toHaveBeenCalledWith({
        type: 'RESET_COMPANY_NOTIFICATION',
      })
    })
  })
})
