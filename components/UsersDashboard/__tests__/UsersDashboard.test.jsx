import React from 'react'
import UsersDashboard from './../index'
import { renderWithState } from './../../../utils/renderWithState'
import { useRouter } from 'next/router'
import {
  mockUserStore,
  mockCompanyStore,
  mockAuthStore,
} from './../../../containers/Dashboard/__mocks__/index'

jest.mock('next/router')
const mockRouter = useRouter

describe('<UsersDashboard/>', () => {
  mockRouter.mockImplementation(() => ({
    asPath: '/dashboard',
  }))

  const initialState = {
    user: {
      ...mockUserStore,
      user: { id: 2, generalRole: 'admin' },
    },
    company: mockCompanyStore,
    auth: { ...mockAuthStore, user: { id: 2, generalRole: 'admin' } },
  }
  const defaultProps = {
    users: {
      totalItems: 2,
      currentPage: 0,
      lastPage: 1,
      items: [
        { id: 1, email: 'test@user1.com' },
        { id: 2, email: 'test@user.com' },
      ],
    },
    userCompanies: [
      { id: 1, email: 'test@company1.com' },
      { id: 2, email: 'test@company2.com' },
    ],
    userColumns: [],
    onGetUsers: jest.fn(),
    userCompaniesColumns: [],
    isExpanded: false,
    isCompaniesExists: false,
    isUsersLoading: false,
  }
  let container

  describe('When default props are passed', () => {
    beforeEach(() => {
      container = renderWithState(<UsersDashboard {...defaultProps} />, {
        initialState,
      })
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should render component', () => {
      expect(
        container.render.getByTestId('user-dashboard-content')
      ).toBeInTheDocument()
    })
    it('should render component with data-testid:"dashboard-table-container"', () => {
      expect(
        container.render.getByTestId('dashboard-table-container')
      ).toBeInTheDocument()
    })

    it('should not render component with data-testid:"loader"', () => {
      expect(() => container.render.getByTestId('loader')).toThrow(
        'Unable to find an element'
      )
    })

    it('should not render component with data-testid:"no-data"', () => {
      expect(() => container.render.getByTestId('no-data')).toThrow(
        'Unable to find an element'
      )
    })
  })
  describe('When isCompaniesExists and isExpanded are equal true', () => {
    const props = {
      ...defaultProps,
      isCompaniesExists: true,
      isExpanded: true,
    }
    beforeEach(() => {
      container = renderWithState(<UsersDashboard {...props} />, {
        initialState,
      })
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should render component with data-testid:"dashboard-table-container"', () => {
      expect(
        container.render.getAllByTestId('dashboard-table-container').length
      ).toBe(2)
    })
  })
  describe('When prop  users prop is "null" ', () => {
    const props = {
      ...defaultProps,
      users: null,
    }
    beforeEach(() => {
      container = renderWithState(<UsersDashboard {...props} />, {
        initialState,
      })
    })
    afterEach(() => {
      jest.clearAllMocks()
    })
    it('should render component with data-testid="no-data"', () => {
      expect(container.render.getByTestId('no-data')).toBeInTheDocument()
    })

    it('should not render component with data-testid:"dashboard-table-container"', () => {
      expect(() =>
        container.render.getByTestId('dashboard-table-container')
      ).toThrow('Unable to find an element')
    })
  })
  describe('When prop isUsersLoading is "true" and users prop is "null" ', () => {
    const props = {
      ...defaultProps,
      users: null,
      isUsersLoading: true,
    }
    beforeEach(() => {
      container = renderWithState(<UsersDashboard {...props} />, {
        initialState,
      })
    })
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should render loader', () => {
      expect(container.render.getByTestId('loader')).toBeInTheDocument()
    })
    it('should not render component with data-testid:"user-dashboard-content"', () => {
      expect(() =>
        container.render.getByTestId('user-dashboard-content')
      ).toThrow('Unable to find an element')
    })

    it('should dispatch action after mount', () => {
      expect(defaultProps.onGetUsers).toHaveBeenCalledTimes(1)
    })
  })
})
