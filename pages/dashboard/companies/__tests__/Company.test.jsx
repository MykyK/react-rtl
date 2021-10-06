import React from 'react'
import { cleanup } from '@testing-library/react'
import Company from './../[companyId]'
import { renderWithState } from './../../../../utils/renderWithState'

describe('test', () => {
  let container
  const initialState = {
    user: mockUserStore,
    auth: mockAuthStore,
    company: mockCompanyStore,
  }

  beforeEach(() => {
    container = renderWithState(<DashboardCompanies />, {
      initialState,
    })
  })

  afterEach(() => {
    cleanup()
  })
  it('test', () => {})
})
