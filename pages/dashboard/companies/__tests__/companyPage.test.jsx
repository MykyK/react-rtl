import React from 'react'
import { cleanup } from '@testing-library/react'
import Company from '../[companyId]'
import { renderWithState } from '../../../../utils/renderWithState'
import {
  mockUserStore,
  mockAuthStore,
  mockCompanyStore,
} from './../../../../containers/Dashboard/__mocks__/index'

jest.mock('next/router', () => {
  return {
    useRouter: () => ({
      query: 1,
    }),
  }
})

jest.mock('../../../../store/actions/companyActions', () => ({
  getCompanyAction: () => ({
    type: 'GET_COMPANY_SUCCESS',
    payload: [{ email: 'test@test.com' }],
  }),
}))

describe('<Company/>', () => {
  let container
  describe('with default props', () => {
    const initialState = {
      user: mockUserStore,
      auth: mockAuthStore,
      company: mockCompanyStore,
    }
    initialState.dispatch = jest.fn()
    beforeEach(() => {
      container = renderWithState(<Company />, { initialState })
    })

    afterEach(() => {
      cleanup()
    })
    it('should render loader', () => {
      expect(container.render.getByTestId('loader')).toBeInTheDocument()
    })
    it('should dispatch action', () => {
      expect(container.store.dispatch).toHaveBeenCalledTimes(1)
      expect(container.store.dispatch).toHaveBeenCalledWith({
        type: 'GET_COMPANY_SUCCESS',
        payload: [{ email: 'test@test.com' }],
      })
    })
  })
  describe('When company prop is passed in', () => {
    const initialState = {
      user: mockUserStore,
      auth: mockAuthStore,
      company: {
        ...mockCompanyStore,
        company: {
          id: 1,
          companyName: 'TestCompany',
          corporateNumber: '29229',
          type: 'PO',
          email: 'test@company.com',
        },
      },
    }
    initialState.dispatch = jest.fn()
    beforeEach(() => {
      container = renderWithState(<Company />, { initialState })
    })

    afterEach(() => {
      cleanup()
    })
    it('should render component', () => {
      expect(container.render.getByTestId('company-page')).toBeInTheDocument()
    })
  })
})
