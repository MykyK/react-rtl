import React from 'react'
import { fireEvent, cleanup } from '@testing-library/react'
import Dashboard from '../index'
import { renderWithState } from '../../../utils/renderWithState'
import {
  mockUserStore,
  mockAuthStore,
  mockCompanyStore,
} from '../__mocks__/index'
import {
  GET_USERS_SUCCESS,
  GET_USER_SUCCESS,
  HIDE_DIALOG,
  RESET_USER_NOTIFICATION,
} from '../../../store/actionTypes'

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

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/dashboard',
      pathname: '/dashboard',
      query: '',
      asPath: '',
    }
  },
}))

describe('<Dashboard/> ', () => {
  let container
  describe('when the default props are passed', () => {
    const initialState = {
      user: mockUserStore,
      auth: mockAuthStore,
      company: mockCompanyStore,
    }
    initialState.dispatch = jest.fn()

    beforeEach(() => {
      container = renderWithState(<Dashboard />, { initialState })
    })

    afterEach(() => {
      cleanup()
    })

    it('should render element with data-testid "dashboard-container"', () => {
      const dashboardContainer = container.render.getByTestId(
        'dashboard-container'
      )
      expect(dashboardContainer).toBeInTheDocument()
    })

    it('should render element with data-testid "no-data"', () => {
      const noDataEl = container.render.getByTestId('no-data')
      expect(noDataEl).toBeInTheDocument()
    })

    it('should not render <Loader/> component', () => {
      expect(() => container.render.getByTestId('loader')).toThrow(
        'Unable to find an element'
      )
    })
  })
  describe('when isLoading prop  is true', () => {
    const initialState = {
      user: { ...mockUserStore, isLoading: true },
      auth: mockAuthStore,
      company: mockCompanyStore,
    }
    initialState.dispatch = jest.fn()

    beforeEach(() => {
      container = renderWithState(<Dashboard />, { initialState })
    })

    afterEach(() => {
      cleanup()
    })

    it('should render <Loader/> component', () => {
      const loader = container.render.getByTestId('loader')
      expect(loader).toBeInTheDocument()
    })

    it('should not render element with data-testid "dashboard-container"', () => {
      expect(() => container.render.getByTestId('dashboard-container')).toThrow(
        'Unable to find an element'
      )
    })
  })

  describe('when notification exists  with success type', () => {
    const initialState = {
      user: {
        ...mockUserStore,
        users: { items: [] },
        notification: { message: 'test', type: 'success' },
      },
      auth: mockAuthStore,
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
      expect(container.store.dispatch).toHaveBeenCalledTimes(4)
      expect(container.store.dispatch).toHaveBeenCalledWith({
        type: GET_USERS_SUCCESS,
        payload: [{ emailAddress: 'test@test.com' }],
      })
      expect(container.store.dispatch).toHaveBeenCalledWith({
        type: GET_USER_SUCCESS,
        payload: [{ emailAddress: 'test@test.com' }],
      })
      expect(container.store.dispatch).toHaveBeenCalledWith({
        type: HIDE_DIALOG,
      })
      expect(container.store.dispatch).toHaveBeenCalledWith({
        type: RESET_USER_NOTIFICATION,
      })
    })
  })

  describe('when users exists', () => {
    const initialState = {
      user: {
        ...mockUserStore,
        users: { items: [{ emailAddress: 'test@test.com' }] },
      },
      auth: mockAuthStore,
      company: mockCompanyStore,
    }

    beforeEach(() => {
      container = renderWithState(<Dashboard />, { initialState })
    })

    afterEach(() => {
      cleanup()
    })

    it('should render only one <DashboardTable/> component with data-testid "dashboard-table" ', () => {
      const usersTable = container.render.getByTestId('dashboard-table')
      expect(usersTable).toBeInTheDocument()
    })
  })

  describe('when users, userCompanies are exist and isExpanded is equal true', () => {
    const initialState = {
      user: {
        ...mockUserStore,
        users: { items: [{ emailAddress: 'test@test.com' }] },
        userCompanies: [{ emailAddress: 'test@test.com' }],
        isExpanded: true,
      },
      auth: mockAuthStore,
      company: mockCompanyStore,
    }

    it('should render two <DashboardTable/> components with data-testid "dashboard-table" ', () => {
      const container = renderWithState(<Dashboard />, { initialState })
      const usersTable = container.render.getAllByTestId('dashboard-table')
      expect(usersTable.length).toBe(2)
    })
  })
})
