import React from 'react'
import DashboardPage from '../index'
import { renderWithState } from '../../../utils/renderWithState'
jest.mock('next/router', () => {
  return {
    useRouter: () => ({
      asPath: '/dashboard',
    }),
  }
})

describe('DashboardPage', () => {
  const container = renderWithState(<DashboardPage />)
  it('should render component', () => {
    expect(
      container.render.getByTestId('dashboard-container')
    ).toBeInTheDocument()
  })
})
