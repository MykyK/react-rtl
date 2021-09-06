import React from 'react'
import { cleanup } from '@testing-library/react'
import DashboardCompanies from './../index'
import { renderWithState } from './../../../../utils/renderWithState'
import {
  mockUserStore,
  mockAuthStore,
  mockCompanyStore,
} from '../../__mocks__/index'
import {
  GET_COMPANIES_SUCCESS,
  HIDE_DIALOG,
  RESET_COMPANY_NOTIFICATION,
} from '../../../../store/actionTypes'

jest.mock('../../../../store/actions/companyActions.js', () => ({
  getCompaniesAction: () => ({
    type: 'GET_COMPANIES_SUCCESS',
    payload: [{ email: 'test@test.com' }],
  }),
  resetCompanyNotification: () => ({
    type: 'RESET_COMPANY_NOTIFICATION',
  }),
}))

jest.mock('../../../../store/actions/userActions', () => ({
  closeDialog: () => ({
    type: 'HIDE_DIALOG',
  }),
  getUsers: () => ({
    type: 'GET_USERS_SUCCESS',
    payload: [{ emailAddress: 'test@test.com' }],
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

describe('<DashboardCompanies/> ', () => {
  let container
  describe('when the default props are passed', () => {
    const initialState = {
      user: mockUserStore,
      auth: mockAuthStore,
      company: mockCompanyStore,
    }
    initialState.dispatch = jest.fn()

    beforeEach(() => {
      container = renderWithState(<DashboardCompanies />, {
        initialState,
      })
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
      user: mockUserStore,
      auth: mockAuthStore,
      company: { ...mockCompanyStore, isLoading: true },
    }
    initialState.dispatch = jest.fn()

    beforeEach(() => {
      container = renderWithState(<DashboardCompanies />, { initialState })
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
      user: mockUserStore,
      auth: mockAuthStore,
      company: {
        ...mockCompanyStore,
        companies: { items: [] },
        notification: { message: 'test', type: 'success' },
      },
    }
    initialState.dispatch = jest.fn()

    beforeEach(() => {
      container = renderWithState(<DashboardCompanies />, { initialState })
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
      const container = renderWithState(<DashboardCompanies />, {
        initialState,
      })
      jest.advanceTimersByTime(400)
      expect(container.store.dispatch).toHaveBeenCalledTimes(3)
      expect(container.store.dispatch).toHaveBeenCalledWith({
        type: GET_COMPANIES_SUCCESS,
        payload: [{ email: 'test@test.com' }],
      })
      expect(container.store.dispatch).toHaveBeenCalledWith({
        type: RESET_COMPANY_NOTIFICATION,
      })
      expect(container.store.dispatch).toHaveBeenCalledWith({
        type: HIDE_DIALOG,
      })
    })
  })

  describe('when companies exists', () => {
    const initialState = {
      user: mockUserStore,
      auth: mockAuthStore,
      company: {
        ...mockCompanyStore,
        companies: { items: [{ email: 'test@test.com' }] },
      },
    }

    beforeEach(() => {
      container = renderWithState(<DashboardCompanies />, { initialState })
    })

    afterEach(() => {
      cleanup()
    })

    it('should render  <DashboardTable/> component with data-testid "dashboard-table" ', () => {
      const table = container.render.getByTestId('dashboard-table')
      expect(table).toBeInTheDocument()
    })
  })
})
