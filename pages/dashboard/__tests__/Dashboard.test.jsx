import React from 'react'
import { fireEvent, cleanup } from '@testing-library/react'
import Dashboard from '../index'
import { renderWithState } from '../../../utils/renderWithState'
import { mockUserStore, mockAuthStore } from '../__mocks__/index'
import { LOGOUT, GET_USERS_SUCCESS } from '../../../store/actionTypes'

jest.mock('../../../store/actions/userActions.js', () => ({
  getUsers: () => ({
    type: 'GET_USERS_SUCCESS',
    payload: [{ username: 'test' }],
  }),
}))

jest.mock('../../../store/actions/authActions.js', () => ({
  logout: () => ({ type: 'LOGOUT' }),
}))

jest.mock('../../../styles/Dashboard.module.scss', () => {
  return {
    centered: {},
  }
})

describe('<Dashboard/> ', () => {
  describe('with default props', () => {
    const initialState = {
      user: mockUserStore,
      auth: mockAuthStore,
    }

    initialState.dispatch = jest.fn()

    let container
    beforeEach(() => {
      container = renderWithState(<Dashboard />, { initialState })
    })

    afterEach(() => {
      cleanup()
    })

    it('should render with default props', () => {
      const dashboardContainer = container.render.getByTestId(
        'dashboard-container'
      )
      expect(dashboardContainer).toBeInTheDocument()
    })

    it('should render no-data element with default props', () => {
      const dashboardNoData = container.render.getByTestId('no-data')
      expect(dashboardNoData).toBeInTheDocument()
    })

    it('should dispatch getUsers action after mount', () => {
      expect(container.store.dispatch).toHaveBeenCalledWith({
        type: GET_USERS_SUCCESS,
        payload: [{ username: 'test' }],
      })
    })
    it('should dispatch logout action after onClick event from Logout button', () => {
      const button = container.render.getByTestId('logout')
      fireEvent.click(button)
      expect(container.store.dispatch).toHaveBeenCalledWith({ type: LOGOUT })
    })
  })

  describe('if props users array has a object', () => {
    const initialState = {
      user: {
        ...mockUserStore,
        users: [{ username: 'test' }],
      },
      auth: mockAuthStore,
    }
    it('should render UserTable ', () => {
      const container = renderWithState(<Dashboard />, { initialState })
      const dashboardTable = container.render.getByTestId('dashboard-table')
      expect(dashboardTable).toBeInTheDocument()
      cleanup()
    })
  })

  describe('if props isLoading is equal true', () => {
    const initialState = {
      user: {
        ...mockUserStore,
        isLoading: true,
      },
      auth: mockAuthStore,
    }
    it('should render UserTable ', () => {
      const container = renderWithState(<Dashboard />, { initialState })
      const dashboardLoader = container.render.getByTestId('dashboard-loader')
      expect(dashboardLoader).toBeInTheDocument()
      cleanup()
    })
  })
})
