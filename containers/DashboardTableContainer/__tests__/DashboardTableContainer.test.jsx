import React from 'react'
import { cleanup } from '@testing-library/react'
import { renderWithState } from '../../../utils/renderWithState'

import { useRouter } from 'next/router'
import DashboardTableContainer from '../DashboardTableContainer'
import { userTable } from './../../Dashboard/tableStructure'
import { mockAuthStore } from './../../Dashboard/__mocks__/index'

jest.mock('../../../store/actions/userActions.js', () => ({
  getUsers: () => ({
    type: 'GET_USERS_SUCCESS',
    payload: [{ emailAddress: 'test@test.com' }],
  }),
}))

jest.mock('../../../store/actions/companyActions.js', () => ({
  getCompaniesAction: () => ({
    type: 'GET_COMPANIES_SUCCESS',
    payload: [{ email: 'test@test.com' }],
  }),
}))

jest.mock('next/router')

const mockRouter = useRouter

describe('<DashboardTableContainer/>', () => {
  let container
  const initialState = {
    auth: {
      ...mockAuthStore,
      user: {
        id: 26,
        firstName: 'test12355',
        lastName: 'test123',
        generalRole: 'user',
        emailAddress: '123@123co.com',
        phoneNumber: '3213234',
      },
    },
  }

  const defaultProps = {
    columns: userTable,
    data: [
      {
        id: 26,
        firstName: 'test12355',
        lastName: 'test123',
        generalRole: 'user',
        emailAddress: '123@123co.com',
        phoneNumber: '3213234',
      },
    ],
    isSelected: true,
    toolBar: false,
    pagination: {
      totalItems: 1,
      totalPages: 1,
      currentPage: 0,
    },
  }

  describe('When default props are passed', () => {
    initialState.dispatch = jest.fn()
    beforeEach(() => {
      mockRouter.mockImplementationOnce(() => ({
        asPath: '/dashboard',
      }))

      container = renderWithState(
        <DashboardTableContainer {...defaultProps} />,
        {
          initialState,
        }
      )
    })

    afterEach(() => {
      cleanup()
      jest.clearAllMocks()
    })

    it('should render component', () => {
      expect(
        container.render.getByTestId('dashboard-table')
      ).toBeInTheDocument()
    })
    it('should not render element with data-testid "table-toolbar"', () => {
      expect(() => container.render.getByTestId('table-toolbar')).toThrow(
        'Unable to find an element'
      )
    })

    it('should dispatch getUsers action', () => {
      expect(container.store.dispatch).toHaveBeenCalledWith({
        type: 'GET_USERS_SUCCESS',
        payload: [{ emailAddress: 'test@test.com' }],
      })
    })
  })
  describe('When toolBar prop is equal true and router path is equal dashboard/companies', () => {
    initialState.dispatch = jest.fn()
    const props = {
      ...defaultProps,
      toolBar: true,
    }
    mockRouter.mockImplementation(() => ({
      asPath: '/companies',
    }))
    beforeEach(() => {
      container = renderWithState(<DashboardTableContainer {...props} />, {
        initialState,
      })
    })

    afterEach(() => {
      cleanup()
      jest.clearAllMocks()
    })

    it('should not render element with data-testid "table-toolbar"', () => {
      expect(container.render.getByTestId('table-toolbar')).toBeInTheDocument()
    })

    it('should dispatch getUsers action', () => {
      expect(container.store.dispatch).toHaveBeenCalledWith({
        type: 'GET_COMPANIES_SUCCESS',
        payload: [{ email: 'test@test.com' }],
      })
    })
  })
})
