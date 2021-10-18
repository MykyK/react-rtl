import React from 'react'
import ListApp from './../index'
import { render, fireEvent, cleanup, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
jest.mock(
  'next/link',
  () =>
    ({ children }) =>
      children
)
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('<ListApp /> ', () => {
  let container
  const push = jest.fn()
  useRouter.mockImplementation(() => ({
    push,
    pathname: '/',
    route: '/',
    asPath: '/',
    query: '',
  }))
  beforeEach(() => {
    container = render(<ListApp />)
  })
  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })
  it('should render component', () => {
    expect(container.getByTestId('list-app')).toBeInTheDocument()
  })

  it('should render link items', () => {
    expect(container.getAllByTestId('link-item').length).toBe(3)
  })
  it('link items should have correct text', () => {
    expect(container.getAllByTestId('link-item')[0]).toHaveTextContent('Users')
    expect(container.getAllByTestId('link-item')[1]).toHaveTextContent(
      'Companies'
    )
    expect(container.getAllByTestId('link-item')[2]).toHaveTextContent(
      'Setting'
    )
  })
  it('link Users should call router.push after onClick event is called', () => {
    fireEvent.click(container.getAllByTestId('link-item')[0])
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/dashboard')
  })
  // it('link Companies should call router.push after onClick event is called', () => {
  //   expect(screen.getByText('Companies').closest('link')).toHaveAttribute(
  //     'href',
  //     '/dashboard/companies'
  //   )
  // })
})
