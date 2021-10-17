import React from 'react'
import CompaniesDashboard from './../index'
import { renderWithState } from './../../../utils/renderWithState'
import { useRouter } from 'next/router'
import {
  mockUserStore,
  mockCompanyStore,
  mockAuthStore,
} from './../../../containers/Dashboard/__mocks__/index'

jest.mock('next/router')
const mockRouter = useRouter

describe('<CompaniesDashboard/>', () => {
  mockRouter.mockImplementation(() => ({
    asPath: '/dashboard/companies',
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
    companies: {
      totalItems: 2,
      currentPage: 0,
      lastPage: 1,
      items: [
        { id: 1, email: 'test@company1.com' },
        { id: 2, email: 'test@company2.com' },
      ],
    },
    companiesColumns: [],
    onGetCompanies: jest.fn(),
    isCompaniesLoading: jest.fn(),
    isCompaniesLoading: false,
  }
  let container

  describe('When default props are passed', () => {
    beforeEach(() => {
      container = renderWithState(<CompaniesDashboard {...defaultProps} />, {
        initialState,
      })
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should render component', () => {
      expect(
        container.render.getByTestId('company-dashboard-content')
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
  describe('When prop  companies prop is "null" ', () => {
    const props = {
      ...defaultProps,
      companies: null,
    }
    beforeEach(() => {
      container = renderWithState(<CompaniesDashboard {...props} />, {
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
  describe('When prop isCompaniesLoading is "true" and companies prop is "null" ', () => {
    const props = {
      ...defaultProps,
      companies: null,
      isCompaniesLoading: true,
    }
    beforeEach(() => {
      container = renderWithState(<CompaniesDashboard {...props} />, {
        initialState,
      })
    })
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should render loader', () => {
      expect(container.render.getByTestId('loader')).toBeInTheDocument()
    })
    it('should not render component with data-testid:"company-dashboard-content"', () => {
      expect(() =>
        container.render.getByTestId('company-dashboard-content')
      ).toThrow('Unable to find an element')
    })

    it('should dispatch action after mount', () => {
      expect(defaultProps.onGetCompanies).toHaveBeenCalledTimes(1)
    })
  })
})
